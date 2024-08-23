<script>
	export let username;
	// export let createdAt;
	export let text;
</script>

<div class="block">
	<div>{username}</div>
	<!-- <div>{createdAt}</div> -->
	<div>{text}</div>
</div>

<style>
	.block {
		display: flex;
		flex-direction: column;
		font-size: 18px;
		margin: auto;
		border-bottom: 1px solid paleturquoise;
		height: auto;
		width: 60%;
		padding: 10px;
	}
</style>
