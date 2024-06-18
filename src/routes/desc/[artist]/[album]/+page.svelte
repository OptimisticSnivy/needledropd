<script>
	import { page } from "$app/stores";
	import { onMount } from "svelte";

	let tags = [];
	let genre = [];
	let artist, aname, info, imgsrc, dname, dartist, summary, pub;
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
		info = data.album;
		let genre = [];
		for (let i = 0; i < 5; i++) {
			genre.push(info.tags.tag[i]["name"]);
		}
		tags = genre;
		imgsrc = data.album.image[5]["#text"];
		dname = info.name;
		dartist = info.artist;
		summary = info.wiki.summary;
		pub = info.wiki.published;
	}

	onMount(() => {
		getAlbumInfo(artist, aname);
		console.log(genre);
	});
</script>

<div id="title">
	<div id="artist">{dartist}</div>
	<div id="aname">{dname}</div>
</div>
<div id="info">
	<div class="block">
		<img src={imgsrc} alt={aname} />
		<div class="text"></div>
	</div>
	<div id="infoblock">
		<div>Published: {pub}</div>
		<div>Genre:</div>
		{#key tags}
			{#each tags as item}
				{item} ,
			{/each}
		{/key}
	</div>
</div>

<style>
	#title {
		margin: 30px;
		border-bottom: solid 4px;
		font-size: 50px;
	}

	#info {
		margin-left: 30px;
		display: flex;
		flex-direction: row;
	}

	#infoblock {
		margin-left: 30px;
		display: flex;
		/* font-family: "Ubuntu"; */
		font-weight:200;
		font-size: 20px;
		flex-direction: column;
		height: 300px;
		width: 70%;
		border: solid;
		border-radius: 10px;
		padding: 10px;
	}

	.block {
		margin-left: 30px;
		display: flex;
		flex-direction: row;
		height: 300px;
		width: 300px;
		border: solid;
		border-radius: 10px;
		padding: 10px;
	}

	img {
		height: 300px;
		width: 300px;
	}

	#aname {
		font-weight: bold;
	}
</style>
