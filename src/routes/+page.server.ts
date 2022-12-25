import type { Actions } from '@sveltejs/kit';
import openai from '$lib/openai';

/** @type {import('./$types').Actions} */
export const actions: Actions = {
	default: async ({ request }) => {
		const data = await request.formData();
		const prompt: string = data.get('prompt')?.toString() ?? 'Exercise';
		console.log(prompt);
		const response = await openai.createCompletion({
			model: 'text-davinci-003',
			prompt: `Create an energetic nudge of max 2 sentences that will encourage me to ${prompt}`,
			temperature: 0.3,
            n: 1,
            max_tokens: 100
		});
		return { success: true, body: response.data };
	}
};
