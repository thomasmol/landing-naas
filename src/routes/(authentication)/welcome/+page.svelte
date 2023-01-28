<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import ExternalLink from '$lib/icons/ExternalLink.svelte';

	let prompt: string;
	let loading: boolean = false;
	let newNudge: Nudge;

	// function thats calls the API
	async function submitForm() {
		loading = true;
		const response = await fetch('/api/nudges', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				prompt,
				anonymous: true
			})
		});
		newNudge = await response.json();
		await invalidateAll();
		loading = false;
	}
</script>

<div class="container">
	<div class="mx-auto mt-10 max-w-xl rounded-lg  border bg-neutral-50 p-10">
		<h1 class="text-center text-xl font-semibold text-slate-800">Welcome to NudgeMe 👋</h1>
		<p class="mt-3 text-center text-xl">
			Easily nudge users of your app to use new features, interact and engage
		</p>
		<div class="mt-4 text-center justify-center">
			<a
				href="https://better-facepile-663270.framer.app/"
				class="flex-inline justify-center flex items-center text-lime-600  underline"
				target="_blank"
				rel="noreferrer">View landing page <ExternalLink /></a>
		</div>
		<p class="mt-10 text-center">Sign in to save nudges.</p>
		<p class="mt-4 flex flex-col">
			<a href="/login" class="rounded border bg-slate-800 p-2 text-center text-white">Sign In</a>
		</p>
	</div>
	<div class="mx-auto mt-10 max-w-xl rounded-lg  border bg-neutral-50 p-4">
		<header class="py-4 text-center">
			<h2>(Demo)</h2>
			<h1 class="text-3xl font-semibold text-neutral-800">What do you want to do?</h1>
		</header>
		<form on:submit|preventDefault={submitForm} class="">
			<div class="flex flex-col justify-around gap-4 text-center">
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
				<div>
					{#if loading}
						<p class="text-3xl text-neutral-800">Loading...</p>
					{:else if newNudge}
						<p class="text-3xl text-neutral-800">{newNudge.text}</p>
						<p class="mt-2 text-sm text-neutral-600">"{newNudge.prompt}"</p>
					{/if}
				</div>
			</div>
		</form>
	</div>
</div>
