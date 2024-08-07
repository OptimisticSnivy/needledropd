<script>
	export let showModal; // boolean

	let dialog; // HTMLDialogElement

	$: if (dialog && showModal) dialog.showModal();
</script>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
<dialog
	bind:this={dialog}
	on:close={() => (showModal = false)}
	on:click|self={() => dialog.close()}
>
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div on:click|stopPropagation>
		<slot name="header" />
		<hr />
		<slot />
		<hr />
		<!-- svelte-ignore a11y-autofocus -->
		<button autofocus>post!</button>
		<button autofocus on:click={() => dialog.close()}>close modal</button>
	</div>
</dialog>

<style>
	* {
		background-color: #1f2937;
		color: paleturquoise;
	}

	button {
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

	dialog {
		max-width: 32em;
		border-radius: 0.2em;
		border: none;
		border-radius: 20px;
		padding: 0;
	}
	dialog::backdrop {
		background: rgba(0, 0, 0, 0.3);
	}
	dialog > div {
		padding: 1em;
	}
	dialog[open] {
		animation: zoom 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
	}
	@keyframes zoom {
		from {
			transform: scale(0.95);
		}
		to {
			transform: scale(1);
		}
	}
	dialog[open]::backdrop {
		animation: fade 0.2s ease-out;
	}
	@keyframes fade {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
	button {
		display: block;
	}
</style>
