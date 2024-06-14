<script>
	import Searchbar from "$lib/searchbar.svelte";
	console.log(import.meta.env.VITE_MESSAGE);
	let key = import.meta.env.VITE_KEY;
	console.log(key);
</script>

<div id="title">needledropd.</div>
<div class="album_grid"></div>

<style>
	#title {
		margin: 20px;
		font-size: 50px;
	}

	.album_grid {
		display: grid;
	}
</style>
