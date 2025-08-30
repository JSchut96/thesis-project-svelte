import { error, fail, redirect, type Actions } from '@sveltejs/kit';
import { v4 as uuidv4 } from 'uuid';

import prisma from '$lib/server/prisma';

const allOrders = [
  ['A', 'B', 'C'],
  ['A', 'C', 'B'],
  ['B', 'A', 'C'],
  ['B', 'C', 'A'],
  ['C', 'A', 'B'],
  ['C', 'B', 'A']
];

export const actions: Actions = {
  default: async ({ request, cookies }) => {
    let sessionId = cookies.get('session_id');
    let participant;
    if(sessionId) {
        participant = await prisma.participant.findUnique({
        where: { sessionId }
      });
    }

    // Check participant existence
    if (participant && participant.started) {
      return fail(403, { error: 'You have either already completed this experiment or exited before finishing. Is this not the case? Then please contact me through the e-mailaddress above.' });
    }

    // Check valid form data
    let data;
    try {
      data = await request.formData();
      } 
      catch (err) {
        console.error('Error parsing form data:', err, new Date().toISOString());
        throw error(400, 'Invalid form data');
      }

    // Check consent given
    const consent = data.get('consent') === 'true';
    if (!consent) {
      return fail(400, { error: 'Consent not given. Please tick the checkbox above before continuing.' });
    }

    // Create session ID and store it in cookie
    if(!sessionId) {
      sessionId = uuidv4();
      cookies.set('session_id', sessionId, {
        path: '/',
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 * 30 * 2, // 2 months
      });
    }

    const timestamp = new Date().toISOString();

    // If first time participant, create database entry
    if(!participant) {
      try {
        // Create participant DB entry
        await prisma.participant.create({
          data: {
            sessionId: sessionId,
            consentGiven: true,
            consentTimestamp: timestamp,
            extractedGenres: [],
            preferenceMovies: [],
            moviePages: [],
          }
        });
      } catch (err) {
        console.error('Failed to create participant:', err, new Date().toISOString());
        throw error(500, 'Problem creating database entry.');
      }

      // Determine layout order for participant
      try {
        participant = await prisma.participant.findUnique({
          where: {sessionId},
        })
        const participantId = participant?.id;
        const layoutOrder = allOrders[(Number(participantId) - 1) % allOrders.length];

        await prisma.participant.update({
          where: { sessionId },
          data: { layoutOrder }
        });
      } catch (err) {
        console.error('Error assigning layoutOrder to participant:', err, new Date().toISOString());
        throw error(500, 'Could not update database.');
      }
      console.log("Created participant ", sessionId, new Date().toISOString());
    }
    throw redirect(303, '/demographic');
  }
};