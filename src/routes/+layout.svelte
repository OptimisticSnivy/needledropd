<script>
	import Navbar from "$lib/navbar.svelte";
</script>

<Navbar />
<slot />

<style>
	:global(body) {
		background-color: #12161a;
		color: paleturquoise;
		font-family: "JetBrains Mono", monospace;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}
</style>
