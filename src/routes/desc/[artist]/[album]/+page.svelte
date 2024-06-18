<script>
	import { page } from "$app/stores";
	import { onMount } from "svelte";

	let artist, aname, info, imgsrc, dname, dartist;
	let API_KEY = import.meta.env.VITE_KEY;

	const splice = $page.url.pathname.split("/");
	artist = splice[2];
	aname = splice[3];
	console.log(artist, aname);

	async function getAlbumInfo(ARTIST, ANAME) {
		const response = await fetch(
			`http://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=${API_KEY}&artist=${ARTIST}&album=${ANAME}&format=json`,
		);
		const data = await response.json();
		console.log(data);
		imgsrc = data.album.image[5]["#text"];
		info = data.album;
		dname = info.name;
		dartist = info.artist;
	}

	onMount(() => {
		getAlbumInfo(artist, aname);
	});
</script>

<div id="title">
	<div id="artist">{dartist}</div>
	<div id="aname">{dname}</div>
</div>
<div class="block">
	<img src={imgsrc} alt={aname} />
	<div class="text"></div>
</div>

<style>
	#title {
		margin: 30px;
		font-size: 50px;
	}

	.block {
		margin: 20px;
		display: flex;
		flex-direction: row;
		/* height: 250px; */
		width: 500px;
		border: thin solid;
		border-radius: 10px;
		padding: 20px;
	}

	img {
		height: 300px;
		width: 300px;
	}

	#aname {
		font-weight: bold;
	}
</style>
