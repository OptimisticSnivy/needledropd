<script>
	import Icon from "@iconify/svelte";
	import Albumcard from "$lib/albumcard.svelte";
	import Searchbar from "$lib/searchbar.svelte";
	import { onMount } from "svelte";

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
		sessionStorage.setItem("key", searchTerm);
	}

	onMount(() => {
		const searchKey = sessionStorage.getItem("key");
		if (searchKey) {
			albumSearch(searchKey);
		}
	});

	function handleEnter(e) {
		if (e.keyCode === 13) {
			e.preventDefault();
			albumSearch(searchTerm);
		}
	}
</script>

<!-- albumSearch(sessionStorage.getItem("key")); -->

<div id="searcbar">
	<div id="title">searchpage.</div>
	<div class="searchDiv">
		<!-- Just Works  -->
		<div on:keydown={handleEnter}>
			<Searchbar bind:searchTerm />
		</div>
		<button id="submit" on:click={albumSearch(searchTerm)}>
			<Icon icon="mdi:search" width="14" height="14" /></button>
	</div>
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
	.cards {
		display: flex;
		flex-wrap: wrap;
		margin: auto;
		justify-content: center;
		max-width: 1600px;
	}

	#searcbar {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		margin: auto;
		margin-top: 50px;
		margin-bottom: 50px;
		min-width: 75%;
	}

	.searchDiv {
		display: flex;
		flex-direction: row;
		justify-content: right;
	}

	#title {
		flex-grow: 1;
		font-size: 35px;
	}

	#submit {
		color: #1f2937;
		background-color: paleturquoise;
		/* width: 4%; */
		height: 35px;
		border: 2px paleturquoise solid;
		border-radius: 20px;
		margin-left: 20px;
		margin-top: 5px;
		padding: 8px;
		font-style: italic;
		font-size: 14px;
		outline: none;
	}
</style>
