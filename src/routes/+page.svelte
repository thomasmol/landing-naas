<script lang="ts">
	import Footer from '$lib/sections/Footer.svelte';
	import { format } from 'timeago.js';
	import { signOut } from '@auth/sveltekit/client';
	import { page } from '$app/stores';

	import type { PageData } from './$types';
	import { invalidateAll } from '$app/navigation';

	export let data: PageData;

	let prompt: string;
	let loading: boolean = false;
	let loadingNudgeId: string = '';
	let newNudge: Nudge;

	let options: Intl.DateTimeFormatOptions = {
		day: 'numeric',
		month: 'long',
		year: 'numeric',
		hour: 'numeric',
		minute: 'numeric'
	};

	// TODO: Add a form validation
	// TODO: create a timeout, so that the user can't spam the button and deplete my API quota/funds

	// function thats calls the API
	async function submitForm() {
		loadingNudgeId = '';
		loading = true;
		const response = await fetch('/api/nudges', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				prompt,
				anonymous: false
			})
		});
		newNudge = await response.json();
		await invalidateAll();
		loading = false;
	}

	async function rate(rating: string, nudge: Nudge) {
		loadingNudgeId = nudge.id;
		loading = true;
		await fetch('/api/nudges/' + nudge.id, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				feedback: rating,
				reaction: nudge.reaction
			})
		});
		await invalidateAll();
		loading = false;
	}

	async function react(reaction: string, nudge: Nudge) {
		loadingNudgeId = nudge.id;
		loading = true;
		await fetch('/api/nudges/' + nudge.id, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				feedback: nudge.feedback,
				reaction: reaction
			})
		});
		await invalidateAll();
		loading = false;
	}

	/* function submitTestForm() {
		nudge = {
			id: v4(),
			text: 'your nudge',
			prompt: prompt,
			promptPrefix: 'prefix',
			feedback: '',
			reaction: '',
			createdAt: new Date()
		};
		nudgesStore.set([nudge, ...$nudgesStore]);
	} */
</script>

<svelte:head>
	<title>SNE</title>
</svelte:head>

<main class="mb-4 ">
	<div class="container flex">
		<p class="py-2">Logged in as {$page.data.session?.user?.name}</p>
		<button on:click={() => signOut()} class="px-1 py-2 hover:bg-slate-100 md:px-6">Sign out</button>
	</div>
	<section id="input">
		<div class="container max-w-2xl px-2">
			<header class="py-10 text-center">
				<h1 class="text-3xl font-semibold text-neutral-800">What do you want to do?</h1>
			</header>
			<form
				on:submit|preventDefault={submitForm}
				class="mx-auto rounded-xl border border-neutral-200 bg-neutral-50 p-6 ">
				<div class="flex flex-wrap justify-around gap-4">
					<input
						type="text"
						name="prompt"
						bind:value={prompt}
						class="flex-grow rounded-xl border-neutral-200 "
						placeholder="&quot;Clean my room&quot;, &quot;exercise&quot;, &quot;ship&quot;, etc..." />
					<button
						disabled={loading}
						type="submit"
						class="w-full rounded-xl border border-lime-300 bg-lime-200 px-8 py-3 text-center text-xl font-semibold text-lime-900  hover:bg-lime-300 md:w-auto "
						>Nudge me!</button>
				</div>
			</form>
		</div>
	</section>
	<section id="nudge" class="mt-10 px-2">
		<div class="container max-w-2xl rounded-xl border bg-neutral-50 py-10 text-center">
			{#if loading && loadingNudgeId === ''}
				<p class="text-3xl text-neutral-800">Loading...</p>
			{:else if newNudge}
				<p class="text-3xl text-neutral-800">{newNudge.text}</p>
				<p class="mt-2 text-sm text-neutral-600">"{newNudge.prompt}"</p>
				<div class="mt-6 flex justify-around gap-4">
					<button
						on:click={() => rate('like', newNudge)}
						class:border-neutral-500={newNudge.feedback === 'like'}
						class="flex-grow rounded-xl border bg-white px-6 py-2 text-center text-xl hover:border-neutral-700 md:w-auto "
						>👍</button>
					<button
						on:click={() => rate('dislike', newNudge)}
						class:border-neutral-500={newNudge.feedback === 'dislike'}
						class="flex-grow rounded-xl border bg-white px-6 py-2 text-center text-xl font-semibold hover:border-neutral-700 md:w-auto "
						>👎</button>
				</div>
			{:else}
				<p class="text-xl text-neutral-500">Be specific!</p>
			{/if}
		</div>
	</section>
	<section id="allnudges" class="mt-10 px-2">
		{#if data.nudges.length > 0}
			<div class="mx-auto max-w-2xl">
				<header>
					<h1 class="text-3xl font-semibold text-neutral-800">Your nudges</h1>
				</header>
				{#each data.nudges as nudge}
					<div class="mt-4 rounded-lg border bg-white">
						<div class="border-b p-4">
							<p class="text-lg font-semibold text-neutral-800">{nudge.text}</p>
							<p class="mt-3 text-sm font-semibold text-neutral-500">
								{format(new Date(nudge.createdAt))}
							</p>
						</div>
						<div class="rounded-b-xl bg-neutral-50 p-4">
							<div class="gap-4 md:flex">
								<div class="flex-1">
									<p class="text-sm font-semibold text-neutral-700">Rate your nudge</p>
									<div class="mt-2">
										{#if loading && nudge.id === loadingNudgeId}
											<button
												disabled
												class="flex-grow rounded-xl border bg-white px-6 py-2 text-center text-xl hover:border-neutral-700 md:w-auto "
												>Loading...</button>
										{:else}
											<button
												on:click={() => rate('like', nudge)}
												class:border-neutral-500={nudge.feedback === 'like'}
												class:bg-neutral-200={nudge.feedback === 'like'}
												class="flex-grow rounded-xl border bg-white px-6 py-2 text-center text-xl hover:border-neutral-700 md:w-auto "
												>👍</button>
											<button
												on:click={() => rate('dislike', nudge)}
												class:border-neutral-500={nudge.feedback === 'dislike'}
												class:bg-neutral-200={nudge.feedback === 'dislike'}
												class="flex-grow rounded-xl border bg-white px-6 py-2 text-center text-xl font-semibold hover:border-neutral-700 md:w-auto "
												>👎</button>
										{/if}
									</div>
								</div>
								<div class="flex-1">
									<p class="text-sm font-semibold text-neutral-700">Did you do "{nudge.prompt}"?</p>
									<div class="mt-2">
										{#if loading && nudge.id === loadingNudgeId}
											<button
												disabled
												class="flex-grow rounded-xl border bg-white px-6 py-2 text-center text-xl hover:border-neutral-700 md:w-auto "
												>Loading...</button>
										{:else}
											<button
												on:click={() => react('yes', nudge)}
												class:border-green-500={nudge.reaction === 'yes'}
												class:bg-green-200={nudge.reaction === 'yes'}
												class="flex-grow rounded-xl border bg-white px-6 py-2 text-center text-xl hover:border-green-700 md:w-auto "
												>✅</button>
											<button
												on:click={() => react('no', nudge)}
												class:border-red-500={nudge.reaction === 'no'}
												class:bg-red-200={nudge.reaction === 'no'}
												class="flex-grow rounded-xl border bg-white px-6 py-2 text-center text-xl font-semibold hover:border-red-700 md:w-auto "
												>🚫</button>
										{/if}
									</div>
								</div>
							</div>
						</div>
					</div>
				{/each}
			</div>
		{/if}
	</section>
</main>
<Footer />
