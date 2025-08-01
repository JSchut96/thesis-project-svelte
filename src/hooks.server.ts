import prisma from '$lib/server/prisma';

export async function handle({ event, resolve }) {
  const sessionId = event.cookies.get('session_id');

  if (sessionId) {
    const participant = await prisma.participant.findUnique({
      where: { sessionId }
    });

    event.locals.participant = participant ?? null;
  } else {
    event.locals.participant = null;
  }

  return resolve(event);
}