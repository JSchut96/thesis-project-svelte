import { error, redirect, type Actions } from '@sveltejs/kit'
import prisma from '$lib/server/prisma'

let layoutIndex: number
let layoutOrder: string[]

export async function load({ locals }) {
  // Check that the participant (user session) exists
  if (!locals.participant) {
    throw error(400, 'Missing or invalid session')
  }

  layoutIndex = locals.participant.layoutIndex
  layoutOrder = locals.participant.layoutOrder

  if (layoutIndex == 0) {
    try {
      await prisma.participant.update({
        where: { sessionId: locals.participant.sessionId },
        data: {
          started: true,
        },
      })
    } catch (err) {
      console.log(
        'Failed to update Started field for paticipant',
        locals.participant.sessionId,
        new Date().toISOString()
      )
      throw error(500, 'Failed to update database')
    }
  }
  return { layoutIndex, layoutOrder }
}

export const actions: Actions = {
  default: async ({ request, locals }) => {
    const participant = locals.participant
    if (!participant) {
      throw error(400, 'Missing or invalid session')
    }

    switch (layoutOrder[layoutIndex]) {
      case 'A':
        throw redirect(303, '/grid')
      case 'B':
        throw redirect(303, '/carousel')
      case 'C':
        throw redirect(303, '/honeycomb')
      default:
        console.log(
          'Failed to redirect to the task. ',
          participant.sessionId,
          new Date().toISOString()
        )
        throw error(404, 'Could not find the next task to direct to.')
    }
  },
}
