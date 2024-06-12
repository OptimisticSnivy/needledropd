<script>
	import Albumcard from "../../lib/albumcard.svelte";
	import searchArr from "$lib/albumcard.svelte";
	console.log(searchArr);
</script>

<div id="title">testpage.</div>
<div class="cards">
	<Albumcard ARTIST="Radiohead" ANAME="Kid A"/>
	<Albumcard ARTIST="Radiohead" ANAME="In Rainbows"/>
</div>

<style>
	#title {
		margin: 20px;
		font-size: 50px;
	}

	.cards {
		display: flex;
		flex-wrap: wrap;
	}
</style>
