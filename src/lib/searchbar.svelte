<script>
	export let searchTerm;
</script>

<div id="bar">
	<input
		id="searchField"
		type="text"
		placeholder="Search"
		bind:value={searchTerm}
		on:input
	/>
</div>

<style>
	#searchField {
		background-color: #1f2937;
		color: paleturquoise;
		width: 90%;
		border: 2px paleturquoise solid;
		border-radius: 14px;
		margin-left: 10px;
		margin-top: 5px;
		padding: 8px;
		font-style: italic;
		font-size: 14px;
		outline: none;
	}
</style>
