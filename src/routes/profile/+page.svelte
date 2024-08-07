<script>
	import { currentUser } from "$lib/pocketbase";
</script>

<slot />
<div id="title">
	<div id="text">profile.</div>
	<div></div>
</div>

{#if $currentUser}
	<p>Logged in as {$currentUser.username}</p>
{/if}

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
