<script>
	import ExternalLink from '$lib/icons/ExternalLink.svelte';
</script>

<main>
	<nav class="bg-neutral-50 fixed w-full backdrop-blur-lg bg-opacity-70">
		<div class="container py-2 space-x-10 text-center text-neutral-700 font-light">
			<a href="/#" class="hover:text-lime-500">Home</a>
			<a href="#features" class="hover:text-lime-500">Features</a>
			<a href="https://smart-nudging-engine.vercel.app" class="hover:text-lime-500">Demo</a>
		</div>
	</nav>
	<section class="container p-32 border-b bg-neutral-50">
		<h1 class="text-center text-6xl font-semibold">10x user engagement</h1>
		<h2 class="mt-10 text-center text-2xl">
			Increase user engagement by effectively nudging users
		</h2>
		<div class="mt-10 flex flex-col items-center">
			<a
				href="https://smart-nudging-engine.vercel.app/"
				target="_blank"
				rel="noreferrer"
				class="flex rounded-lg border border-lime-300 bg-lime-200 px-8 py-3 text-xl font-semibold text-lime-900 hover:bg-lime-300"
				>Try demo <div class="ml-4 h-6"><ExternalLink /></div>
			</a>
		</div>
	</section>
	<section class="container py-32">
		<header class="text-center">
			<h1 class="text-2xl font-semibold">Effective nudging</h1>
			<h2 class="mt-2 text-lg">What will the system provide</h2>
		</header>
		<div class="flex gap-10 mt-20">
			<div>
				<h3 class="text-lg font-semibold text-neutral-900">Automated</h3>
				<p class="mt-2 text-neutral-700">
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam voluptates, quod, quia,
					voluptatibus quae voluptatum quibusdam voluptas quos quidem quas nesciunt. Quisquam, quae.
					Quisquam, quae.
				</p>
			</div>
			<div>
				<h3 class="text-lg font-semibold text-neutral-900">Personalized</h3>
				<p class="mt-2 text-neutral-700">
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam voluptates, quod, quia,
					voluptatibus quae voluptatum quibusdam voluptas quos quidem quas nesciunt. Quisquam, quae.
					Quisquam, quae.
				</p>
			</div>
			<div>
				<h3 class="text-lg font-semibold text-neutral-900">Customizable</h3>
				<p class="mt-2 text-neutral-700">
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam voluptates, quod, quia,
					voluptatibus quae voluptatum quibusdam voluptas quos quidem quas nesciunt. Quisquam, quae.
					Quisquam, quae.
				</p>
			</div>
		</div>
	</section>
	<footer class="mt-20">
		<div class="container">
			<p>&copy; 2022</p>
		</div>
	</footer>
</main>
