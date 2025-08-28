import { fetchMoviesById } from '$lib/apiHelpers/fetchMoviesById'
import { error } from '@sveltejs/kit'
import prisma from '$lib/server/prisma';

export async function load({ locals }) {
    if (!locals.participant) {
        throw error(400, 'Missing or invalid session');
    }

    const layout = locals.participant.moviePages?.honeycomb;
    const genreOrder = locals.participant.extractedGenres;

    if (!layout || !genreOrder) {
        throw error(400, 'Missing layout data or extracted genres');
    }

    let existingProfile;
    try {
        existingProfile = await prisma.honeycombMeasurements.findUnique({
            where: { sessionId: locals.participant.sessionId }
        });
    } catch (err) {
        console.error('Database read failed:', err);
        throw error(500, 'Failed to read database entry.');
    }

    // Handle business logic separately so our 400 is not masked
    if (!existingProfile) {
        try {
            await prisma.honeycombMeasurements.create({
                data: {
                    sessionId: locals.participant.sessionId,
                    startTime: Date.now(),
                },
            });
            console.log("Created honeycombMeasurements entry for participant ", locals.participant.sessionId, new Date().toISOString());
        } catch (err) {
            console.error('Database create failed:', err);
            throw error(500, 'Failed to create database entry.');
        }
    } else {
        if (existingProfile.endTime === null) {
            console.log("Restarting task for ", locals.participant.sessionId, new Date().toISOString());
            try {
                await prisma.honeycombMeasurements.update({
                    where: { sessionId: locals.participant.sessionId },
                    data: { startTime: Date.now() },
                });
            } catch (err) {
                console.error('Database update failed:', err);
                throw error(500, 'Failed to update database entry.');
            }
        } else {
            console.error("Measurement session already completed for ", locals.participant.sessionId, new Date().toISOString());
            throw error(400, 'Task already completed for this session.');
        }
    }

    // Fetch all movie details per genre
    console.log("Start fetching honeycomb movies for", locals.participant.sessionId, new Date().toISOString());

    const movieDetailsByGenre: Record<string, any[]> = {};
    try {
        for (const genre of genreOrder) {
            const entries = layout[genre];
            if (!entries) continue;

            const movieIds = entries.map((entry: { movieId: number; rating: number }) => entry.movieId);
            movieDetailsByGenre[genre] = await fetchMoviesById(movieIds);
        }
        console.log('Done fetching honeycomb movies for', locals.participant.sessionId, new Date().toISOString());
        return { movieDetailsByGenre, genreOrder };
    } catch (err) {
        console.error('Error while fetching movie details:', err, new Date().toISOString());
        throw error(500, 'Failed to contact TheMovieDB API.');
    }
}
