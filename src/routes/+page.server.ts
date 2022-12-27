import type { Actions } from '@sveltejs/kit';
import openai from '$lib/openai';

/** @type {import('./$types').Actions} */
export const actions: Actions = {
	default: async ({ request }) => {
		const data = await request.formData();
		const prompt: string = data.get('prompt')?.toString() ?? 'Exercise';
		const response = await openai.createCompletion({
			model: 'text-davinci-003',
			prompt: `Create a single energetic nudge of max 2 sentences that will encourage me to ${prompt}`,
			temperature: 0.1,
			n: 1,
			max_tokens: 150
		});
		return { success: true, nudge: response.data.choices[0].text?.replaceAll('\n', ' ') };
	}
};
