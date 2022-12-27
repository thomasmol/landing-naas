import type { RequestHandler } from './$types';
import openai from '$lib/openai';
import { json } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request }) => {
	const { prompt } = await request.json();
	const response = await openai.createCompletion({
		model: 'text-davinci-003',
		prompt: `Create a single energetic nudge of max 2 sentences that will encourage me to ${prompt}`,
		temperature: 0.1,
		n: 1,
		max_tokens: 150
	});
	return json(response.data.choices[0].text?.replaceAll('"', ''));
};
