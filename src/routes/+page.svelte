<script lang="ts">
	import Footer from '$lib/sections/Footer.svelte';
	import { nudgesStore } from '$lib/stores/nudges';
	let prompt: string;
	let loading: boolean = false;
	let nudge: Nudge;
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
		nudge = await response.json();
		nudgesStore.set([nudge, ...$nudgesStore]);
		loading = false;
	}

	function submitTestForm() {
		nudge = {
			id: 'string',
			text: 'your nudge',
			prompt: prompt,
			promptPrefix: 'prefix',
			feedback: '',
			reaction: '',
			createdAt: new Date()
		};
		nudgesStore.set([nudge, ...$nudgesStore]);
	}
</script>

<svelte:head>
	<title>SNE</title>
</svelte:head>

<main class="mb-4">
	<section id="input">
		<div class="container px-2">
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
		<div class="container rounded-xl border bg-neutral-50 py-20 text-center">
			{#if loading}
				<p class="text-3xl text-neutral-800">Loading...</p>
			{:else if nudge}
				<p class="text-3xl text-neutral-800">{nudge.text}</p>
			{:else}
				<p class="text-xl text-neutral-500">Your nudge will appear here</p>
			{/if}
		</div>
	</section>
	<section id="allnudges" class="mt-10 px-2">
		{#if $nudgesStore.length > 0}
			<div class="container rounded-xl border bg-neutral-50 p-4">
				<header>
					<h1 class="text-3xl font-semibold text-neutral-800">Your nudges</h1>
				</header>

				{#each $nudgesStore as nudge}
					<div class="mt-4 flex justify-between rounded-lg border bg-white p-4 gap-4">
						<div>
							<p class="font-semibold text-neutral-800">{nudge.text}</p>
							<p class="mt-1 text-sm text-neutral-600">"{nudge.prompt}"</p>
						</div>
						<p>{new Date(nudge.createdAt).toLocaleDateString('en-US', options)}</p>
					</div>
				{/each}
			</div>
		{/if}
	</section>
</main>
<Footer />
