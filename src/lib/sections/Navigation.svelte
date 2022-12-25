<script lang="ts">
	import ExternalLink from '$lib/icons/ExternalLink.svelte';
</script>
<nav class="fixed w-full bg-neutral-50 bg-opacity-70 backdrop-blur-lg">
  <div class="container flex justify-center space-x-10 py-2 font-light text-neutral-700">
    <a href="/#" class="hover:text-lime-500">Home</a>
    <a href="#features" class="hover:text-lime-500">Features</a>
    <a href="#roadmap" class="hover:text-lime-500">Roadmap</a>
    <a
      href="https://smart-nudging-engine.vercel.app"
      target="_blank"
      rel="noreferrer"
      class="flex items-center hover:text-lime-500">Advanced Demo &nbsp;<ExternalLink /></a>
  </div>
</nav>