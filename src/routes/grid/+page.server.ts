import {fetchMoviesById} from '$lib/apiHelpers/fetchMoviesById'
import {error} from '@sveltejs/kit'
import prisma from '$lib/server/prisma';

export async function load({ locals }) {
    // Check that the participant (user session) exists
    if (!locals.participant) {
        throw error(400, 'Missing or invalid session');
    }

    const layout = locals.participant.moviePages?.grid;
    const genreOrder = locals.participant.extractedGenres;

    if (!layout || !genreOrder) {
        throw error(400, 'Missing layout data or extracted genres');
    }

    try {
      // Create participant DB entry
      await prisma.gridMeasurements.create({
        data: {
          sessionId: locals.participant.sessionId,
          startTime: Date.now(),
        }
      });
      console.log("Created gridMeasurements entry for participant", locals.participant.sessionId, new Date().toISOString());
    } catch (err) {
      console.error('Database create failed:', err, new Date().toISOString());
      throw error(500, 'Failed to create database entry.');
    }

    // Fetch all movie details per genre
    console.log("Start fetching grid movies for", locals.participant.sessionId, new Date().toISOString());

    const movieDetailsByGenre: Record<string, any[]> = {};

    try {
        for (const genre of genreOrder) {
        const entries = layout[genre];
        if (!entries) continue;

        const movieIds = entries.map((entry: { movieId: number; rating: number }) => entry.movieId);
        movieDetailsByGenre[genre] = await fetchMoviesById(movieIds);
        }

        console.log('Done fetching grid movies for', locals.participant.sessionId, new Date().toISOString());
        return { movieDetailsByGenre, genreOrder };

    } catch (err) {
        console.error('Error while fetching movie details:', err, new Date().toISOString());
        throw error(500, 'Failed contacting TheMovieDB API.');
    }
}