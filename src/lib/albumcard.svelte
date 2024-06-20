<script>
	import { onMount } from "svelte";

	let imgsrc, aname, artist, album, arname;
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

	album = ANAME.replace(/\s/g, "+").toLowerCase();
	arname = ARTIST.replace(/\s/g, "+").toLowerCase();
</script>

<div class="block">
	<a href="/desc/{arname}/{album}/">
		<!-- <a href="/desc/[album]/"> -->
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
		border: solid;
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

	#title {
		display: flex;
		font-size: 35px;
		margin: auto;
		margin-top: 50px;
		margin-bottom: 50px;
		width: 75%;
	}

	#text {
		flex-grow: 1;
		text-align: left;
	}
</style>
