<script>
	async function getAlbumInfo(ANAME, ARTIST) {
		const API_KEY = "bf0006fdbb2fe14addcc6f11a07025eb";
		const response = await fetch(
			`http://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=${API_KEY}&artist=${ARTIST}&album=${ANAME}&format=json`,
		);
		const data = await response.json();
		return data;
	}

	const ANAME = "Kid A";
	const ARTIST = "Radiohead";
	const data = getAlbumInfo(ANAME, ARTIST);
</script>

<p>
	URL is here: {data}
</p>
