<script>
	import { onMount } from "svelte";

	let url, desc, imgsrc, aname, artist;
	onMount(async function getAlbumInfo() {
		const API_KEY = "bf0006fdbb2fe14addcc6f11a07025eb";
		const ANAME = "Kid A";
		const ARTIST = "Radiohead";
		const response = await fetch(
			`http://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=${API_KEY}&artist=${ARTIST}&album=${ANAME}&format=json`,
		);
		const data = await response.json();
		imgsrc = data.album.image[3]["#text"];
		aname = ANAME;
		artist = ARTIST;
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
		width: 200px;
	}

	.text{
		margin: 5px;
		padding: 5px;
	}

	#aname{
		font-weight: bold;
	}
</style>
