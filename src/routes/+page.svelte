<script lang="ts">
	import Footer from '$lib/sections/Footer.svelte';
	import { nudgesStore } from '$lib/stores/nudges';
	import { v4 } from 'uuid';
	import { format } from 'timeago.js';

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
		nudge.id = v4();
		nudgesStore.set([nudge, ...$nudgesStore]);
		loading = false;
	}

	async function rate(rating: string, nudge: Nudge) {
		if (rating === 'like') {
			nudge.feedback = 'like';
		} else if (rating === 'dislike') {
			nudge.feedback = 'dislike';
		} else {
			nudge.feedback = 'no feedback';
		}
		let index = $nudgesStore.findIndex((value) => {
			value.id == nudge.id;
		});
		$nudgesStore[index] = nudge;
	}
	async function react(reaction: string, nudge: Nudge) {
		if (reaction === 'yes') {
			nudge.reaction = 'yes';
		} else if (reaction === 'no') {
			nudge.reaction = 'no';
		} else {
			nudge.reaction = 'no reaction';
		}
		let index = $nudgesStore.findIndex((value) => {
			value.id == nudge.id;
		});
		$nudgesStore[index] = nudge;
	}

	function submitTestForm() {
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
	}
</script>

<svelte:head>
	<title>SNE</title>
</svelte:head>

<main class="mb-4 ">
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
			{#if loading}
				<p class="text-3xl text-neutral-800">Loading...</p>
			{:else if nudge}
				<p class="text-3xl text-neutral-800">{nudge.text}</p>
				<p class="mt-2 text-sm text-neutral-600">"{nudge.prompt}"</p>
				<div class="mt-6 flex justify-around gap-4">
					<button
						on:click={() => rate('like', nudge)}
						class:border-neutral-500={nudge.feedback === 'like'}
						class="flex-grow rounded-xl border bg-white px-6 py-2 text-center text-xl hover:border-neutral-700 md:w-auto "
						>👍</button>
					<button
						on:click={() => rate('dislike', nudge)}
						class:border-neutral-500={nudge.feedback === 'dislike'}
						class="flex-grow rounded-xl border bg-white px-6 py-2 text-center text-xl font-semibold hover:border-neutral-700 md:w-auto "
						>👎</button>
				</div>
			{:else}
				<p class="text-xl text-neutral-500">Be specific!</p>
			{/if}
		</div>
	</section>
	<section id="allnudges" class="mt-10 px-2">
		{#if $nudgesStore.length > 0}
			<div class="mx-auto max-w-2xl">
				<header>
					<h1 class="text-3xl font-semibold text-neutral-800">Your nudges</h1>
				</header>
				{#each $nudgesStore as nudge}
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
										<button
											on:click={() => rate('like', nudge)}
											class:border-neutral-500={nudge.feedback === 'like'}
											class="flex-grow rounded-xl border bg-white px-6 py-2 text-center text-xl hover:border-neutral-700 md:w-auto "
											>👍</button>
										<button
											on:click={() => rate('dislike', nudge)}
											class:border-neutral-500={nudge.feedback === 'dislike'}
											class="flex-grow rounded-xl border bg-white px-6 py-2 text-center text-xl font-semibold hover:border-neutral-700 md:w-auto "
											>👎</button>
									</div>
								</div>
								<div class="flex-1">
									<p class="text-sm font-semibold text-neutral-700">Did you do "{nudge.prompt}"?</p>
									<div class="mt-2">
										<button
											on:click={() => react('yes', nudge)}
											class:border-green-500={nudge.reaction === 'yes'}
											class="flex-grow rounded-xl border bg-white px-6 py-2 text-center text-xl hover:border-green-700 md:w-auto "
											>✅</button>
										<button
											on:click={() => react('no', nudge)}
											class:border-red-500={nudge.reaction === 'no'}
											class="flex-grow rounded-xl border bg-white px-6 py-2 text-center text-xl font-semibold hover:border-red-700 md:w-auto "
											>🚫</button>
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
