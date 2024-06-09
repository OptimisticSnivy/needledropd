<script>
	import Albumcard from "../../lib/albumcard.svelte";
</script>

<slot />
<div id="title">testpage.</div>
<div class="cards">
	<Albumcard />
	<Albumcard />
	<Albumcard />
	<Albumcard />
	<Albumcard />
	<Albumcard />
	<Albumcard />
	<Albumcard />
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
