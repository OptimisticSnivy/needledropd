<script>
	import Navbar from "$lib/navbar.svelte";
</script>

<Navbar />
<slot />

<style>
	:global(body) {
		background-color: #1f2937;
		color: paleturquoise;
		font-family: "Ubuntu";
		display: flex;
		flex-direction: column;
		justify-content: center;
	}
</style>
