import { json } from '@sveltejs/kit';

export async function GET({ locals }) {
	if (!locals.participant) {
		return json({ redirect: '/error' });
	}

	// Decide where to send the user
	const layoutIndex = locals.participant.layoutIndex;
	const layoutOrder = locals.participant.layoutOrder;

	const next = layoutOrder[layoutIndex];

	let redirectUrl;
	switch (next) {
		case 'A':
			redirectUrl = '/grid';
			break;
		case 'B':
			redirectUrl = '/carousel';
			break;
		case 'C':
			redirectUrl = '/honeycomb';
			break;
		default:
			redirectUrl = '/error';
	}

	return json({ redirect: redirectUrl });
}