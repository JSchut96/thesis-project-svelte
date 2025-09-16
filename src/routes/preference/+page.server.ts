import prisma from '$lib/server/prisma'
import { fetchMoviesById } from '$lib/apiHelpers/fetchMoviesById'
import { error, redirect } from '@sveltejs/kit'

const elicitation_movies = [
  603, 329, 280, 11, 550, 602, 568, 85, 120, 8587, 13, 278, 680, 857, 424, 862,
  105, 808, 607, 36955, 629, 274, 954, 77, 268, 14, 1637, 114, 2493, 597,
]

export async function load({ locals }) {
  const participant = locals.participant
  if (!participant) {
    throw error(400, 'Missing or invalid session')
  }

  console.log(
    'Start fetching preference movies for',
    locals.participant?.sessionId,
    new Date().toISOString()
  )

  try {
    const movies = await fetchMoviesById(elicitation_movies)
    console.log(
      'Done fetching preference movies for',
      locals.participant?.sessionId,
      new Date().toISOString()
    )
    return { movies }
  } catch (err) {
    console.error(
      'Error while fetching movie details:',
      err,
      new Date().toISOString()
    )
    throw error(500, 'Failed contacting TheMovieDB API')
  }
}
