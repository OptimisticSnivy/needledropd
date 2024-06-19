<script>
	import Icon from "@iconify/svelte";
</script>

<div id="nav">
	<div id="brand">needledropd.</div>
	<nav id="routes">
		<a href="/"><Icon icon="material-symbols-light:home"  width="28" height="28"/></a>
		<a href="/searchpage"><Icon icon="mdi:search" width="28" height="28"/></a>
		<a href="/profile"><Icon icon="mdi:user" width="28" height="28" /></a>
		<a href="/about"><Icon icon="mdi:about" width="28" height="28"/></a>
	</nav>
</div>

<style>
	#nav {
		display: flex;
		flex-wrap: wrap;
		margin: 20px;
		font-size: 20px;
	}

	#brand {
		font-size: 27px;
		margin-left: 100px;
		margin-top: 15px;
		flex-grow: 1;
	}

	#routes {
		margin-right: 100px;
		margin-top: 20px;
	}

	a {
		color: paleturquoise;
		text-decoration: none;
	}
</style>
