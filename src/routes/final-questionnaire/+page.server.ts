import { error, redirect, type Actions } from '@sveltejs/kit';
import prisma from '$lib/server/prisma';
import fetch from "node-fetch"
import { DISCORD_WEBHOOK } from '$env/static/private'

export const actions: Actions = {
    default: async ({ request, locals }) => {
        const participant = locals.participant;
        if (!participant) {
            throw error(400, 'Missing or invalid session');
        }

        let formData;
        try {
            formData = await request.formData();
        } catch (err) {
            console.error('Error parsing form data:', err);
            throw error(400, 'Invalid form data');
        }

        try {
            await prisma.questionnaireAnswers.create({ 
                data: {
                    sessionId: participant.sessionId,
                    layoutRank1: formData.get('layoutRank1') as string,
                    layoutRank2: formData.get('layoutRank2') as string,
                    layoutRank3: formData.get('layoutRank3') as string,
                    reasoning: formData.get('reasoning') as string,
                    prosCons: formData.get('prosCons') as string,
                    remarks:formData.get('remarks') as string || null
                } 
            });
            console.log("Questionnaire answers added to DB for user ", participant.sessionId, new Date().toISOString());
        } catch (err) {
            console.error('Database update failed:', err, new Date().toISOString());
            throw error(500, 'Failed to create database entry.');
        }

        try {
            await prisma.participant.update({
                where: {sessionId: participant.sessionId},
                data: {
                    finished: true,
            }
            })
        } catch(err) {
            console.log("Failed to update finished variable for paticipant", participant.sessionId, new Date().toISOString());
            throw error(500, 'Failed to update database entry.');
        }


        try {
            const count = await prisma.participant.count();

            await fetch(DISCORD_WEBHOOK, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    content: `🎉 New participant finished!\nTotal participants: **${count}**`
                }),
            });        
        } catch (err) {
            console.log("Failed to send message to discord.")
        }
        

        throw redirect(303, '/thank-you');
     }
}