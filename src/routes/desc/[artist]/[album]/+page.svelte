<script>
	import { page } from "$app/stores";
	import { onMount } from "svelte";

	let tags = [];
	let artist, aname, info, imgsrc, dname, dartist, tracks, pub, len, tlen;
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
		imgsrc = data.album.image[5]["#text"];
		dname = info.name;
		dartist = info.artist;
		pub = info.wiki.published;
		tracks = info.tracks.track;
		len = tracks.length;

		let genre = [];
		let dur = 0;
		const getTags = 5;

		for (let j = 0; j < len; j++) {
			dur = dur + tracks[j].duration;
		}

		for (let i = 0; i < getTags; i++) {
			genre.push(info.tags.tag[i]["name"]);
		}

		tags = genre;
		tlen = Math.floor(dur / 60);
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
				<li>Published: {pub}</li>
				<li>Length: {len} tracks, {tlen} minutes</li>
				<li>Genre: {tags}</li>
			</ul>
		</div>
	</div>
	<img src={imgsrc} alt={aname} />
</div>
<div id="t2">Reviews</div>

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

	#t2 {
		display: flex;
		font-size: 25px;
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
