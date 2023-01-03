import type { RequestHandler } from './$types';
import openai from '$lib/openai';
import { json } from '@sveltejs/kit';
// using this function results in error, so now done at client side
// something about servers i suppose
// import { v4 } from 'uuid';

export const POST: RequestHandler = async ({ request }) => {
	const { prompt } = await request.json();
	const promptPrefix = 'Create 1 encouraging nudge that will encourage me to do the following:';
	const response = await openai.createCompletion({
		model: 'text-davinci-003',
		prompt: `${promptPrefix} ${prompt}.`,
		temperature: 0.5,
		n: 1,
		max_tokens: 150
	});
	const nudgeText: string = response.data.choices[0].text?.replaceAll('"', '') ?? '';
	const nudge: Nudge = {
		id: (Math.random() + 1).toString(36).substring(7),
		text: nudgeText,
		prompt: prompt,
		promptPrefix: promptPrefix,
		feedback: '',
		reaction: '',
		createdAt: new Date()
	};
	return json(nudge);
};
