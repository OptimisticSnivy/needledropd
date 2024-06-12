<script>
	import { onMount } from "svelte";

	let url, desc, imgsrc, aname, artist, res;
	export let searchArr = [];
	export let ANAME;
	export let ARTIST;

	async function getAlbumInfo(ARTIST, ANAME) {
		const API_KEY = "bf0006fdbb2fe14addcc6f11a07025eb";
		const response = await fetch(
			`http://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=${API_KEY}&artist=${ARTIST}&album=${ANAME}&format=json`,
		);
		const data = await response.json();
		imgsrc = data.album.image[3]["#text"];
		aname = ANAME;
		artist = ARTIST;
	}

	async function albumSearch(ANAME) {
		const API_KEY = "bf0006fdbb2fe14addcc6f11a07025eb";
		const response = await fetch(
			`http://ws.audioscrobbler.com/2.0/?method=album.search&album=${ANAME}&api_key=${API_KEY}&format=json`,
		);

		const data = await response.json();

		for (let i = 0; i < 10; i++) {
			let searchRes = [];
			res = data.results.albummatches.album[i];
			// searchRes.push(res);
			searchRes.push(res.name);
			searchRes.push(res.artist);
			searchArr.push(searchRes);
		}
	}

	onMount(() => {
		getAlbumInfo(ARTIST, ANAME);
		// albumSearch(ANAME);
	});
</script>

<div class="block">
	<img src={imgsrc} alt={aname} />
	<div class="text">
		<p id="aname">{aname}</p>
		<p id="artist">{artist}</p>
	</div>
</div>

<style>
	.block {
		margin: 30px;
		/* height: 250px; */
		width: 200px;
		border: thin solid;
		border-radius: 10px;
		padding: 10px;
	}

	img {
		height: 200px;
		border-radius: 10px;
		width: 200px;
	}

	.text {
		margin: 5px;
		padding: 5px;
	}

	#aname {
		font-weight: bold;
	}
</style>
