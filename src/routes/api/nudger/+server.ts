import type { RequestHandler } from './$types';
import openai from '$lib/openai';
import { json } from '@sveltejs/kit';
import { v4 as uuidv4 } from 'uuid';

export const POST: RequestHandler = async ({ request }) => {
	const { prompt } = await request.json();
	const promptPrefix = 'Create 1 encouraging nudge with max 1 emoji that will encourage me to ';
	const response = await openai.createCompletion({
		model: 'text-davinci-003',
		prompt: `${promptPrefix} ${prompt}`,
		temperature: 0.5,
		n: 1,
		max_tokens: 150
	});
	const nudgeText: string = response.data.choices[0].text?.replaceAll('"', '') ?? '';
	const nudge: Nudge = {
		id: 'uuidv4()',
		text: nudgeText,
		prompt: prompt,
		promptPrefix: promptPrefix,
		feedback: '',
		reaction: '',
		createdAt: new Date()
	};
	return json(nudge);
};
