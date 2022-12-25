import type { RequestHandler } from './$types';
import openai from '$lib/openai';

export const POST: RequestHandler = async ({ request }) => {
    const {prompt} = await request.json();
	const response = await openai.createCompletion({
		model: 'davinci',
		prompt: prompt,
		temperature: 0,
	});
	console.log(response.data);

	return new Response();
};

