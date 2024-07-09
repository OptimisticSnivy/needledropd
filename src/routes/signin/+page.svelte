<script>
	import PocketBase from "pocketbase";

	const pb = new PocketBase("http://127.0.0.1:8090");

	let username = "";
	let password = "";

	async function signin() {
		const data = {
			username,
			password,
			passwordConfirm: password,
			name: "test1",
		};
		const record = await pb.collection("users").create(data);
		await login();
	}

	async function login() {
		await pb.collection("users").authWithPassword(username, password);
	}
</script>

<slot />
<div id="title">
	<div id="text">sign in.</div>
</div>
<div id="field">
	<form on:submit|preventDefault>
		<label for="Username"></label>
		<div id="lg">
			<input
				id="lgfield0"
				placeholder="username"
				type="text"
				bind:value={username}
				on:input
			/>
			<input
				id="lgfield0"
				placeholder="password"
				type="password"
				bind:value={password}
				on:input
			/>
		</div>
		<button id="signin" on:click={signin}>Sign In</button>
	</form>
</div>

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

	#signin {
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

	input:-webkit-autofill {
		-webkit-box-shadow: paleturquoise 1000px #1f2937 inset !important;
	}
</style>
