<script>
	import { onMount } from "svelte";
	let url, desc, imgsrc, aname, artist, res;
	let API_KEY = import.meta.env.VITE_KEY;

	export let ANAME;
	export let ARTIST;

	async function getAlbumInfo(ARTIST, ANAME) {
		const response = await fetch(
			`http://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=${API_KEY}&artist=${ARTIST}&album=${ANAME}&format=json`,
		);
		const data = await response.json();
		imgsrc = data.album.image[3]["#text"];
		aname = ANAME;
		artist = ARTIST;
	}

	onMount(() => {
		getAlbumInfo(ARTIST, ANAME);
	});
</script>

<div class="block">
	<a href="/">
		<img src={imgsrc} alt={aname} />
		<div class="text">
			<p id="aname">{aname}</p>
			<p id="artist">{artist}</p>
		</div>
	</a>
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

	a {
		text-decoration: none;
		color: paleturquoise;
	}
</style>
