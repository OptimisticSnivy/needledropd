<script>
	import PocketBase from "pocketbase";

	const pb = new PocketBase("http://127.0.0.1:8090");

	let record;
	let username = "";
	let password = "";
	let passwordConfirm = "";
	let name = "";

	async function signin() {
		const data = {
			username,
			password,
			name,
			passwordConfirm,
		};
		if (password === passwordConfirm) {
			record = await pb.collection("users").create(data);
			console.log(record);
			await login();
		} else {
			console.log("Passwords don't match");
		}
	}

	async function login() {
		await pb.collection("users").authWithPassword(username, password);
	}
</script>

<slot />
<div id="title">
	<div id="text">sign in.</div>
</div>

{#if record}
	<div>You are logged in!</div>
{:else}
	<div id="field">
		<form on:submit|preventDefault>
			<label for="Username"></label>
			<div id="lg">
				<input
					id="lgfield0"
					placeholder="Your Name"
					type="text"
					bind:value={name}
					on:input
				/>
				<input
					id="lgfield0"
					placeholder="Username"
					type="text"
					bind:value={username}
					on:input
				/>
				<input
					id="lgfield0"
					placeholder="Password"
					type="password"
					bind:value={password}
					on:input
				/>

				<input
					id="lgfield0"
					placeholder="Confirm Password"
					type="password"
					bind:value={passwordConfirm}
					on:input
				/>
			</div>
			<button id="in" on:click={signin}>Sign In</button>
			<!-- <button id="in" on:click={login}>Log In</button> -->
		</form>
	</div>
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

	#lg {
		display: flex;
		flex-direction: column;
		flex-wrap: wrap;
		margin: auto;
	}

	#lgfield0 {
		color: paleturquoise;
		background-color: #1f2937;
		color: paleturquoise;
		width: 15%;
		border: 2px paleturquoise solid;
		border-radius: 14px;
		margin-left: 10px;
		margin-top: 10px;
		padding: 8px;
		font-style: italic;
		font-size: 14px;
		outline: none;
	}

	#in {
		color: #1f2937;
		background-color: paleturquoise;
		/* width: 4%; */
		height: 35px;
		border: 2px paleturquoise solid;
		border-radius: 10px;
		margin-left: 10px;
		margin-top: 13px;
		padding: 8px;
		/* font-style: italic; */
		font-size: 14px;
		outline: none;
	}

	#field {
		margin: auto;
		width: 75%;
	}

	input:-webkit-autofill,
	input:-webkit-autofill:hover,
	input:-webkit-autofill:focus,
	input:-webkit-autofill:active {
		transition: #1f2937 5000s ease-in-out 0s;
	}

	input:autofill {
		background: #1f2937;
	}
</style>
