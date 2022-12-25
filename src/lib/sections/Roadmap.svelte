<script lang="ts">
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
					done: true
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
	<title>NudgeMe Roadmap</title>
</svelte:head>

<section id="roadmap" class="mt-40 border-t border-neutral-600 bg-neutral-800 pb-20">
	<header class="py-20 text-center">
		<h1 class="text-2xl font-semibold text-neutral-100">Roadmap</h1>
		<h2 class="mt-2 text-lg text-neutral-200">Upcoming milestones for this project</h2>
	</header>
	<div class="container text-center text-neutral-300">
		{#each roadmap as { date, tasks }}
			<div class="py-4">
				<header class="py-1">
					<h1 class="font-semibold text-lime-300">{formatter.format(date)}</h1>
				</header>
				{#each tasks as { task, done }}
					<p class="pb-1 text-lg">{done ? '✅' : '🔒'} {task}</p>
				{/each}
			</div>
		{/each}
	</div>
</section>
