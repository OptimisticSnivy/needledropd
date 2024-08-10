import PocketBase from "pocketbase";

const pb = new PocketBase("http://127.0.0.1:8090");

let record;

async function getPosts() {
	const records = await pb.collection("posts").getFullList({
		sort: "-created",
	});
	console.log(records);
}
getPosts();
