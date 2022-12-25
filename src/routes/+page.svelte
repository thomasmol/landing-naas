<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import Footer from '$lib/sections/Footer.svelte';
	let prompt: string;
	let loading = false;
	async function generateNudge() {
		loading = true;
		const response = await fetch('/api/nudger', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				prompt: prompt
			})
		});
		if (response.ok) {
			loading = false;
			invalidateAll();
		} else {
			loading = false;
			throw new Error(response.statusText);
		}
	}
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
				action=""
				class="mx-auto max-w-xl rounded-xl border border-neutral-200 bg-neutral-50 p-6 ">
				<div class="flex flex-wrap justify-around gap-4">
					<input
						type="text"
						bind:value={prompt}
						class="w-full rounded-xl border-neutral-200 md:w-auto "
						placeholder='"Clean my room..."' />
					<button
						type="submit"
						class="w-full rounded-lg border border-lime-300 bg-lime-200 px-8 py-3 text-center text-xl font-semibold  text-lime-900 hover:bg-lime-300 md:w-auto"
						>Nudge me</button>
				</div>
			</form>
		</div>
	</section>
</main>
<Footer />
