import { writable } from "svelte/store";
import PocketBase from "pocketbase";

const pb = new PocketBase("http://127.0.0.1:8090"); // Hide when deployed!

export const currentUser = writable(pb.authStore.model);

pb.authStore.onChange(() => {
	console.log("authStore Changed!");
	currentUser.set(pb.authStore.model);
});
