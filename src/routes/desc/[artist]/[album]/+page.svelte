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

	async function getAlbumInfo(ARTIST, ANAME) {
		const response = await fetch(
			`http://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=${API_KEY}&artist=${ARTIST}&album=${ANAME}&format=json`,
		);
		const data = await response.json();
		info = data.album;
		let genre = [];
		const getTags = 5;
		for (let i = 0; i < getTags; i++) {
			genre.push(info.tags.tag[i]["name"]);
		}
		tags = genre;
		imgsrc = data.album.image[5]["#text"];
		dname = info.name;
		dartist = info.artist;
	}

	onMount(() => {
		getAlbumInfo(artist, aname);
	});
</script>

<div id="album">
	<div id="text">
		<div id="title">
			<div id="artist">{dartist}</div>
			<div id="aname">{dname}</div>
		</div>
		<div id="info">
			<ul>
				<li>Published:2004</li>
				<li>Length:1.25 Hours</li>
				<li>Genre:Rock, Alternative Rock, Art Pop, Hip-Hop, Electronic</li>
			</ul>
		</div>
	</div>
	<img src={imgsrc} alt={aname} />
</div>

<style>
	#album {
		display: flex;
		flex-wrap: wrap;
		margin: auto;
		margin-top: 30px;
		margin-bottom: 50px;
		min-width: 70%;
	}

	#text {
		font-size: 30px;
		display: flex;
		flex-direction: column;
		margin: 30px;
		margin-top: 100px;
		flex-grow: 1;
	}

	#info {
		margin-left: 30px;
		display: flex;
		flex-direction: row;
		margin: 0;
		margin-top: 10px;
	}

	img {
		height: 300px;
		width: 300px;
		margin: 30px;
	}

	#aname {
		font-weight: bold;
	}

	#info {
		font-size: 22px;
	}

	ul {
		list-style-type: none; /* Change to disc, circle, square, etc. */
		margin: 0;
		padding: 0;
	}
</style>
