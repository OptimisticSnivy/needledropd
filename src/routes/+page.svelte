<script>
	import Searchbar from "$lib/searchbar.svelte";
	import Albumcard from "$lib/albumcard.svelte";
</script>

<div id="title">needledropd.</div>
<div class="album_grid"></div>
<Albumcard />

<style>
	#title {
		margin: 20px;
		font-size: 50px;
	}

	.album_grid {
		display: grid;
	}
</style>
