<script lang="ts">
	import ExternalLink from '$lib/icons/ExternalLink.svelte';
	let options: Intl.DateTimeFormatOptions = {
		weekday: 'long',
		month: 'long',
		day: 'numeric'
	};
	let formatter = new Intl.DateTimeFormat('en-US', options);
	type Roadmap = {
		date: Date;
		tasks: {
			task: string;
			done: boolean;
		}[];
	};
	let roadmap: Roadmap[] = [
		{
			date: new Date('27 December 2022'),
			tasks: [
				{
					task: 'Finish this page and setup website with prototype',
					done: false
				}
			]
		},
		{
			date: new Date('3 January 2023'),
			tasks: [
				{
					task: 'Generate nudge using OpenAI api based on nudge compontents',
					done: false
				}
			]
		},
		{
			date: new Date('10 January 2023'),
			tasks: [
				{
					task: 'Add capability to create groups of users/nudgees',
					done: false
				}
			]
		},
		{
			date: new Date('17 January 2023'),
			tasks: [
				{
					task: 'Add authentication and user management',
					done: false
				}
			]
		},
		{
			date: new Date('24 January 2023'),
			tasks: [
				{
					task: 'Add capability to add new nudge components',
					done: false
				}
			]
		},
		{
			date: new Date('28 January 2023'),
			tasks: [
				{
					task: 'Present at Demo day',
					done: false
				}
			]
		},
		{
			date: new Date('1 February 2023'),
			tasks: [
				{
					task: 'go to sf',
					done: false
				}
			]
		}
	];
</script>

<svelte:head>
	<title>SNE</title>
</svelte:head>

<main>
	<nav class="fixed w-full bg-neutral-50 bg-opacity-70 backdrop-blur-lg">
		<div class="container flex justify-center space-x-10 py-2 font-light text-neutral-700">
			<a href="/#" class="hover:text-lime-500">Home</a>
			<a href="#features" class="hover:text-lime-500">Features</a>
			<a href="#roadmap" class="hover:text-lime-500">Roadmap</a>
			<a
				href="https://smart-nudging-engine.vercel.app"
				target="_blank"
				rel="noreferrer"
				class="flex items-center hover:text-lime-500">Demo &nbsp;<ExternalLink /></a>
		</div>
	</nav>
	<section class="border-b bg-neutral-50 py-48">
		<header>
			<h1 class="text-center text-6xl font-semibold">10x user engagement</h1>
			<h2 class="mt-10 text-center text-2xl">
				Increase user engagement by effectively nudging users
			</h2>
		</header>
		<div class="mt-10 flex flex-col items-center">
			<a
				href="https://smart-nudging-engine.vercel.app/"
				target="_blank"
				rel="noreferrer"
				class="flex items-center rounded-lg border border-lime-300 bg-lime-200 px-8 py-3 text-xl  font-semibold text-lime-900 hover:bg-lime-300"
				>Try demo &nbsp;<ExternalLink />
			</a>
		</div>
	</section>
	<section id="features" class="container mt-10">
		<header class="py-20 text-center">
			<h1 class="text-2xl font-semibold">Features</h1>
			<h2 class="mt-2 text-lg">What will the system provide</h2>
		</header>
		<div class="grid gap-10 lg:grid-cols-3 ">
			<div>
				<h3 class="text-lg font-semibold text-neutral-900">Automated</h3>
				<p class="mt-2 text-neutral-700">
					Set up automated nudges based on user behavior and watch your engagement soar. Say goodbye
					to tedious manual tasks and hello to increased productivity.
				</p>
			</div>
			<div>
				<h3 class="text-lg font-semibold text-neutral-900">Personalized</h3>
				<p class="mt-2 text-neutral-700">
					Our nudging tool goes beyond generic messages and delivers personalized nudges to each
					individual user. By understanding their unique needs and preferences, we can increase the
					chances of them taking the desired action.
				</p>
			</div>
			<div>
				<h3 class="text-lg font-semibold text-neutral-900">Customizable</h3>
				<p class="mt-2 text-neutral-700">
					Customize every aspect of your nudging strategy to fit your specific goals and audience.
					It's like having your own personal engagement specialist at your fingertips.
				</p>
			</div>
		</div>
	</section>
	<section id="roadmap" class="mt-40 border-t border-neutral-600 bg-neutral-800 pb-20">
		<header class="py-20 text-center">
			<h1 class="text-2xl font-semibold text-neutral-100">Roadmap</h1>
			<h2 class="mt-2 text-lg text-neutral-200">Dev planning of tool</h2>
		</header>
		<div class="container text-center text-neutral-300">
			{#each roadmap as { date, tasks }}
				<div class="py-4">
					<header class="py-1">
						<h1 class="font-semibold text-lime-300">{formatter.format(date)}</h1>
					</header>
					{#each tasks as { task, done }}
						<p class="pb-1 text-lg">{done ? '[x]' : '[ ]'} {task}</p>
					{/each}
				</div>
			{/each}
		</div>
	</section>
	<footer class="bg-neutral-900 py-12">
		<div class="container">
			<p class="flex space-x-10">
				<a
					href="https://github.com/thomasmol/smart-nudging-engine"
					target="_blank"
					rel="noreferrer"
					class="flex items-center text-lime-700">Github &nbsp;<ExternalLink /></a>
				<a
					href="https://twitter.com/thomas_a_mol"
					target="_blank"
					rel="noreferrer"
					class="flex items-center text-lime-700">Twitter &nbsp;<ExternalLink /></a>
				<a
					href="https://thomasmol.com"
					target="_blank"
					rel="noreferrer"
					class="flex items-center text-lime-700">Me &nbsp;<ExternalLink /></a>
			</p>
		</div>
	</footer>
</main>
