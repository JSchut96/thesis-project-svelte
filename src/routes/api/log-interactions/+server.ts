import type { RequestHandler } from '@sveltejs/kit';
import prisma from '$lib/server/prisma';
import { error, json } from '@sveltejs/kit';
import type { Prisma } from '@prisma/client';
import type { DefaultArgs } from '@prisma/client/runtime/library';

type Layout = 'grid' | 'carousel' | 'honeycomb';


const layoutToModel = {
  grid: prisma.gridMeasurements,
  carousel: prisma.carouselMeasurements,
  honeycomb: prisma.honeycombMeasurements
};

function getModel(layout: Layout) {
  switch (layout) {
    case 'grid':
      return prisma.gridMeasurements;
    case 'carousel':
      return prisma.carouselMeasurements;
    case 'honeycomb':
      return prisma.honeycombMeasurements;
  }
}

function isLayout(value: string): value is Layout {
  return ['grid', 'carousel', 'honeycomb'].includes(value);
}


export const POST: RequestHandler = async ({ request, locals }) => {
    // Check that the participant (user session) exists
    const participant = locals.participant;
    if (!participant) {
        throw error(400, 'Missing or invalid session');
    }

    const {layout, chosenMovie, actions, timestamp}: {layout: string, chosenMovie: string, actions: any[], timestamp: Date} = await request.json();
    
    if(!actions) {
        throw error(400, 'No mouse actions provided.');
    }

    if (!isLayout(layout)) {
        throw error(400, `Invalid layout: ${layout}`);
    }

    // A lot of double code, but if I make a flexible model based on layout I get a lot of Type issues :(
    // Fetch currentMeasurements for startTime
    let currentMeasurements;
    try {
    switch (layout) {
        case 'grid':
            currentMeasurements = await prisma.gridMeasurements.findUnique({
            where: { sessionId: participant.sessionId },
        });
            break;
        case 'carousel':
            currentMeasurements = await prisma.carouselMeasurements.findUnique({
            where: { sessionId: participant.sessionId },
        });
            break;
        case 'honeycomb':
            currentMeasurements = await prisma.honeycombMeasurements.findUnique({
            where: { sessionId: participant.sessionId },
        });
            break;
    }

    if (!currentMeasurements) {
        throw new Error("Session not found");
    }
    } catch (err) {
        console.error("Database fetch failed:", err);
        return json({ success: false }, { status: 500 });
    }

    // Update participant with all measurements
    try {
    switch (layout) {
        case 'grid':
            await prisma.gridMeasurements.update({
                where: { sessionId: participant.sessionId },
                data: {
                    firstMovie: actions[0].itemId,
                    chosenMovie,
                    hoveredMovies: actions,
                    endTime: Number(timestamp),
                    totalTime: Number(timestamp) - Number(currentMeasurements.startTime),
                    }
                });
            break;

        case 'carousel':
            await prisma.carouselMeasurements.update({
                where: { sessionId: participant.sessionId },
                data: {
                    firstMovie: actions[0].itemId,
                    chosenMovie,
                    hoveredMovies: actions,
                    endTime: Number(timestamp),
                    totalTime: Number(timestamp) - Number(currentMeasurements.startTime),
                    }
                });
            break;

        case 'honeycomb':
            await prisma.honeycombMeasurements.update({
                where: { sessionId: participant.sessionId },
                data: {
                    firstMovie: actions[0].itemId,
                    chosenMovie,
                    hoveredMovies: actions,
                    endTime: Number(timestamp),
                    totalTime: Number(timestamp) - Number(currentMeasurements.startTime),
                    }
                });
            break;
    }
        console.log(`Logged ${layout} actions for `, participant.sessionId, new Date().toISOString());
    } catch (err) {
        console.error("Database update failed:", err);
        return json({ success: false }, { status: 500 });
    }

    // Respond with success
    return json({ redirect: '/task-questionnaire' }, { status: 200 });    
}