<script>
	import Post from "../../lib/post.svelte";
</script>

<slot />
<div id="title">
	<div id="text">about.</div>
</div>
<Post />

<style>
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
