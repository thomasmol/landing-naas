import type { RequestHandler } from './$types';
import prisma from '$lib/database';
import type { Nudge } from '@prisma/client';

export const PUT = (async ({ request, params }) => {
	const { feedback, reaction } = await request.json();

  const nudge: Nudge = await prisma.nudge.update({
    where: {
      id: params.id
    },
		data: {
			feedback: feedback,
			reaction:reaction
		}
	});
	return new Response(JSON.stringify(nudge));
}) satisfies RequestHandler;
