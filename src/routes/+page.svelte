<script lang="ts">
	import type { PageData, ActionData } from './$types';
	import Footer from '$lib/sections/Footer.svelte';
	let prompt: string;
	let loading = false;
	let nudge : any;

	// TODO: Add a loading state
	// TODO: Add a success state
	// TODO: Add a failure state
	// TODO: Add a form validation
	// TODO: create a timeout, so that the user can't spam the button and deplete my API quota/funds

	// function thats calls the API
	async function submitForm() {
		loading = true;
		const response = await fetch('/api/nudger', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				prompt
			})
		});
		loading = false;
		nudge = await response.json();

	}

	export let form: ActionData;
</script>

<svelte:head>
	<title>SNE</title>
</svelte:head>

<main>
	<section class="">
		<div class="container">
			<header class="py-10 text-center">
				<h1 class="text-3xl font-semibold text-neutral-800">What do you want to do?</h1>
			</header>
			<form
				on:submit|preventDefault={submitForm}
				class="mx-auto max-w-2xl rounded-xl border border-neutral-200 bg-neutral-50 p-6 ">
				<div class="flex flex-wrap justify-around gap-4">
					<input
						type="text"
						name="prompt"
						bind:value={prompt}
						class="rounded-xl flex-grow border-neutral-200 "
						placeholder="&quot;Clean my room&quot;, &quot;exercise&quot;, &quot;ship&quot;, etc..." />
					<button
						disabled={loading}
						type="submit"
						class="w-full md:w-auto rounded-xl border border-lime-300 bg-lime-200 px-8 py-3 text-center text-xl font-semibold  text-lime-900 hover:bg-lime-300 "
						>Nudge me!</button>
				</div>
			</form>
			<div class="py-10 text-center">
				{#if loading}
					<p class="text-3xl text-neutral-800">Loading...</p>
				{/if}
				{#if form?.nudge}
					<p class="text-3xl text-neutral-800">{form?.nudge}</p>
				{/if}
				{#if nudge}
					<p class="text-3xl text-neutral-800">{nudge}</p>
				{/if}
			</div>
		</div>
	</section>
</main>
<Footer />
