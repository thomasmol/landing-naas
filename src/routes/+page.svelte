<script lang="ts">
	import type { PageData, ActionData } from './$types';
	import Footer from '$lib/sections/Footer.svelte';
	let prompt: string;
	let loading = false;

	// TODO: Add a loading state
	// TODO: Add a success state
	// TODO: Add a failure state
	// TODO: Add a form validation
	// TODO: create a timeout, so that the user can't spam the button and deplete my API quota/funds

	export let form: ActionData;
</script>

<svelte:head>
	<title>SNE</title>
</svelte:head>

<main>
	<section class="">
		<div class="container">
			<header class="py-10 text-center">
				<h1 class="text-xl font-semibold">What do you want to do?</h1>
			</header>
			<form
				method="POST"
				class="mx-auto max-w-xl rounded-xl border border-neutral-200 bg-neutral-50 p-6 ">
				<div class="flex flex-wrap justify-around gap-4">
					<input
						type="text"
						name="prompt"
						class="rounded-xl flex-grow border-neutral-200 "
						placeholder="&quot;Clean my room, exercise, ship, etc...&quot;" />
					<button
						type="submit"
						class="w-full md:w-auto rounded-lg border border-lime-300 bg-lime-200 px-8 py-3 text-center text-xl font-semibold  text-lime-900 hover:bg-lime-300 "
						>Nudge me!</button>
				</div>
			</form>
			<div class="py-10 text-center">
				{#if form?.body.choices[0].text}
					<h2 class="text-xl font-semibold text-neutral-700">Here's what I think you should do:</h2>
					<p class=" mt-4 text-3xl text-neutral-800">{form?.body.choices[0].text}</p>
				{/if}
			</div>
		</div>
	</section>
</main>
<Footer />
