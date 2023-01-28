import type { Nudge } from '@prisma/client';
import type { PageServerLoad } from './$types';

export const load = (async ({ fetch }) => {
	const responseNudges = await fetch('/api/nudges');
	const nudges: Nudge[] = await responseNudges.json();
	return { nudges };
}) satisfies PageServerLoad;
