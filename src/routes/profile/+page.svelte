<script>
	import Navbar from "$lib/navbar.svelte";
</script>

<div id="title">Hello from Profile</div>
<Navbar />

<style>
	:global(body) {
		background-color: #1f2937;
		color: paleturquoise;
		font-family: "Ubuntu";
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	#title {
		margin: 20px;
		font-size: 50px;
	}
</style>
