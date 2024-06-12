<script>
	import { onMount } from "svelte";
	import Albumcard from "../../lib/albumcard.svelte";
	import { writable } from "svelte/store";

	let searchArr = writable([]);
	let res;

	async function albumSearch(ANAME) {
		const API_KEY = "bf0006fdbb2fe14addcc6f11a07025eb";
		const response = await fetch(
			`http://ws.audioscrobbler.com/2.0/?method=album.search&album=${ANAME}&api_key=${API_KEY}&format=json`,
		);

		const data = await response.json();

		let searchRes = [];
		for (let i = 0; i < 10; i++) {
			res = data.results.albummatches.album[i];
			let term = {
				album: res.name,
				artist: res.artist,
			};
			searchRes.push(term);
		}
		searchArr.set(searchRes);
	}

	const ANAME = "Kid A";

	onMount(async () => {
		await albumSearch(ANAME);
		console.log($searchArr);
	});
</script>

<div id="title">testpage.</div>
<div>Printed {searchArr}</div>
<div class="cards">
	<Albumcard ARTIST="Radiohead" ANAME="Kid A" />
	<Albumcard ARTIST="Radiohead" ANAME="In Rainbows" />
	<Albumcard ARTIST="Kero Kero Bonito" ANAME="Bonito Generation" />
	{#each $searchArr as item}
		<Albumcard ARTIST={item.artist} ANAME={item.album} />
	{/each}
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
