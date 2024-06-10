<script>
	import { onMount } from "svelte";

	let url, desc, imgsrc, aname, artist;
	let search = [];

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
			`http://ws.audioscrobbler.com/2.0/?method=album.search&album=${ANAME}&api_key=bf0006fdbb2fe14addcc6f11a07025eb&format=json`,
		);
		const data = await response.json();
		console.log(data);
	}

	onMount(() => {
		const ANAME = "Plastic Beach";
		const ARTIST = "Gorillaz";
		albumSearch(ANAME);
		getAlbumInfo(ARTIST, ANAME);
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
