import { error, redirect, type Actions } from '@sveltejs/kit';
import prisma from '$lib/server/prisma';

let layoutIndex: number;
let layoutOrder: string[];
let layout: string;


export async function load({locals}){
    // Check that the participant (user session) exists
    if (!locals.participant) {
        throw error(400, 'Missing or invalid session');
    }

    layoutIndex = locals.participant.layoutIndex;
    layoutOrder = locals.participant.layoutOrder;

    switch(layoutOrder[layoutIndex]){
        case 'A':
            layout='Grid';
            break;
        case 'B':
            layout='Carousel';
            break;
        case 'C':
            layout='Honeycomb';
            break;
        default:
            break;
    }

    return {layout}
}

export const actions: Actions = {
    default: async ({ request, locals }) => {
        const participant = locals.participant;
        if (!participant) {
            throw error(400, 'Missing or invalid session');
        }

        let formData: FormData;
        try {
            formData = await request.formData();
        } catch (err) {
            console.error('Error parsing form data:', err, new Date().toISOString());
            throw error(400, 'Invalid form data');
        }

        const data: Record<string, string> = {};
            formData.forEach((value, key) => {
            data[key] = value.toString();
        });

        const payload = Object.entries(data).map(([adjective, value]) => ({
            sessionId: participant.sessionId,
            layout,
            adjective,
            value: Number(value)
        }));

        try {
            await prisma.likertRating.createMany({ data: payload });
            console.log(` ${layout} Likert ratings added to DB for user `, participant.sessionId, new Date().toISOString());
        } catch (err) {
            console.error('Database update failed:', err, new Date().toISOString());
            throw error(500, 'Failed to create database entries.');
        }

        if(layoutIndex == 2) {
            throw redirect(303, '/final-questionnaire');
        }
        else {
            try {
            const newLayoutIndex = participant.layoutIndex + 1;

            await prisma.participant.update({
                where: { sessionId: participant.sessionId },
                data: {
                    layoutIndex: newLayoutIndex,
                }
            });
            console.log("Updated layoutIndex for ", participant.sessionId, new Date().toISOString());
            } catch (err) {
                console.error('Could not update participant:', err, new Date().toISOString());
                throw error(500, 'Failed to update database entry.');
            }
            throw redirect(303, '/instructions');
        }
    }
};