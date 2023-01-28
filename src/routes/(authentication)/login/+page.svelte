<script lang="ts">
	import { signIn, signOut } from '@auth/sveltekit/client';
	import { page } from '$app/stores';
	import Footer from '$lib/sections/Footer.svelte';
</script>

<main class="container">
	<div class="mt-10 rounded-lg bg-neutral-50 border  p-10 max-w-md mx-auto">
		<h1 class="text-center text-xl font-semibold text-slate-800">
			Sign in to use NudgeMe
		</h1>
		<p class="mt-3 text-center">Click <a href="/welcome" class="text-lime-600 text-lg font-semibold underline">here</a>  to try a demo without logging in</p>
		<p class="mt-4 flex flex-col">
			<button on:click={() => signIn('github')} class="rounded border bg-slate-800 p-2 text-white"
				>Sign In with GitHub</button>
		</p>
	</div>
</main>

<Footer/>
