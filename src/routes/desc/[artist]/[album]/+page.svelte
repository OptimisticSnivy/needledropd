<script>
	import { page } from "$app/stores";
	import { currentUser } from "$lib/pocketbase";
	import { onMount } from "svelte";
	import Modal from "$lib/modal.svelte";
	import Post from "$lib/post.svelte";
	import PocketBase from "pocketbase";

	const pb = new PocketBase("http://127.0.0.1:8090");

	let records, rtext;

	let tags = [];
	let showModal = false;
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

	async function getPosts() {
		records = await pb.collection("posts").getFullList({
			sort: "-created",
		});
		for (let index = 0; index < records.length; index++) {
			console.log(records[index].userId);
			console.log($currentUser.id);
			if (records[index].userId === $currentUser.id) {
				rtext = records[index].review;
			}
		}
		console.log(records[0].review);
	}

	onMount(() => {
		getAlbumInfo(artist, aname);
		getPosts();
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
	<div class="buttons">
		<img src={imgsrc} alt={aname} />
		{#if $currentUser}
			<button id="submit" on:click={() => (showModal = true)}>Review</button>
		{/if}
	</div>
</div>
<div id="t2">
	<div>Your Reviews</div>
</div>

{#if $currentUser}
	<Post username={$currentUser.username} text={rtext} />
{/if}
<Modal bind:showModal>
	<h2 slot="header">Post your review!</h2>
	<textarea name="post" id="post"></textarea>
</Modal>

<style>
	#post {
		background-color: #1f2937;
		color: paleturquoise;
		outline: none;
		height: 500px;
		width: 500px;
	}

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
		flex-direction: column;
		font-size: 25px;
		margin: auto;
		margin-top: 50px;
		margin-bottom: 50px;
		padding: 10px;
		width: 55%;
		border-bottom: 1px solid paleturquoise;
	}

	#text {
		flex-grow: 1;
		text-align: left;
	}

	#submit {
		color: #1f2937;
		background-color: paleturquoise;
		justify-content: center;
		min-width: 70%;
		height: 35px;
		border: 2px paleturquoise solid;
		border-radius: 20px;
		font-style: italic;
		font-size: 14px;
		outline: none;
	}

	.buttons {
		display: flex;
		flex-direction: column;
	}

	textarea {
		border: none;
		overflow: auto;
		outline: none;
		font-size: 15px;

		-webkit-box-shadow: none;
		-moz-box-shadow: none;
		box-shadow: none;
		background-color: transparent;
		resize: none; /*remove the resize handle on the bottom right*/
	}
</style>
