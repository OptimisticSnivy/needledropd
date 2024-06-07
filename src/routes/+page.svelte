<script>
	import Searchbar from "../lib/searchbar.svelte";
</script>

<div id="title">needledropd.</div>
<div class="album_grid"></div>
<Searchbar />

<style>
	#title {
		margin: 20px;
		font-size: 50px;
	}

	.album_grid {
		display: grid;
	}
</style>
