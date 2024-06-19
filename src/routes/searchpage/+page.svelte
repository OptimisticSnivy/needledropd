<script>
	import Icon from "@iconify/svelte";
	import Albumcard from "$lib/albumcard.svelte";
	import Searchbar from "$lib/searchbar.svelte";

	let API_KEY = import.meta.env.VITE_KEY; // Secure further please!
	let searchArr = [];
	let searchTerm = "";
	let res;

	async function albumSearch(ANAME) {
		const response = await fetch(
			`http://ws.audioscrobbler.com/2.0/?method=album.search&album=${ANAME}&api_key=${API_KEY}&format=json`,
		);

		const data = await response.json();

		let searchRes = [];
		const getAlbums = 12;
		for (let i = 0; i < getAlbums; i++) {
			res = data.results.albummatches.album[i];
			let term = {
				album: res.name,
				artist: res.artist,
			};
			searchRes.push(term);
		}
		searchArr = searchRes;
		console.log(searchArr);
	}
</script>

<div id="title">searchpage.</div>
<div class="searchDiv">
	<Searchbar bind:searchTerm />
	<button
		id="submit"
		on:click={() => {
			albumSearch(searchTerm);
			searchTerm = "";
		}}
	>
		<Icon icon="mdi:search" width="14" height="14" /></button
	>
</div>
<div class="cards">
	<!-- re-renders everytime a new searchterm is submitted! -->
	{#key searchArr}
		{#each searchArr as item}
			<Albumcard ARTIST={item.artist} ANAME={item.album} />
		{/each}
	{/key}
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

	.searchDiv {
		display: flex;
		justify-content: left;
	}

	#submit {
		color: #1f2937;
		background-color: paleturquoise;
		/* width: 4%; */
		height: 35px;
		border: 2px paleturquoise solid;
		border-radius: 20px;
		margin: 5px 27px;
		padding: 8px;
		font-style: italic;
		font-size: 14px;
		outline: none;
	}
</style>
