import prisma from '$lib/server/prisma';
import type { Gender, Experience, InputDevice } from '@prisma/client';
import { error, redirect, type Actions } from '@sveltejs/kit';


export const actions: Actions = {
  default: async ({ request, locals }) => {
    const participant = locals.participant;
    if (!participant) {
      throw error(400, 'Missing or invalid session');
    }

    let data: FormData;
    try {
      data = await request.formData();
    } catch (err) {
      console.error('Error parsing form data:', err);
      throw error(400, 'Invalid form data');
    }

    console.log(data.get('inputDevice'));

    try {
      await prisma.participant.update({
        where: { sessionId: participant.sessionId },
        data: {
          age: Number(data.get('age')),
          gender: data.get('gender') as Gender,
          nationality: String(data.get('nationality')),
          netflixExperience: data.get('netflixExperience') as Experience,
          disneyExperience: data.get('disneyExperience') as Experience,
          hoursPerWeek: Number(data.get('hoursPerWeek')),
          inputDevice: data.get('inputDevice') as InputDevice
        }
      });
    } catch (err) {
      console.error('Database update failed:', err, new Date().toISOString());
      throw error(500, 'Failed to update database');
    }

    console.log("Stored Demographic info for participant ", participant.sessionId, new Date().toISOString());

    throw redirect(303, '/preference');
  }
};
