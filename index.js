"use strict";

let postListDB;

function makeList(topic="all topics") {
	const postList = document.getElementById("postList");

	postListDB["posts"].forEach((post) => {
		const title = post[0] + " ~~ " + post[1];
		const listItem = document.createElement("li");
		const link = document.createElement("a");

		link.innerText = title;
		link.href = "https://blog.eddiefed.com/posts/" + (post[0].replace(/ /g, "-")).toLowerCase() + ".html";

		// console.log(topic);
		if (topic === "all topics" || post[2].includes(topic)) {
			listItem.appendChild(link);
			postList.appendChild(listItem);
		}
	});
}

function clearList() {
	const postList = document.getElementById("postList");
	const children = Array.prototype.slice.call(postList.children);
	children.forEach((child) => {
		// console.log("removed node");
		postList.removeChild(child);
	});
}

function loadPage() {
	fetch("https://api.github.com/repos/eddiefed/dynamic-github-blog/contents/posts/db.json")
	.then(r => r.json())
	.then(d => {
		postListDB = JSON.parse(atob(d["content"]));
		postListDB["posts"] = postListDB["posts"].reverse();

		const selectionThingy = document.getElementById("topic");
		postListDB["topics"].forEach(topic => {
			const item = document.createElement("option");
			item.value = topic;
			item.innerText = topic;

			selectionThingy.appendChild(item);
		});

		makeList();
	});
}

function reloadList() {
	postListDB["posts"] = postListDB["posts"].reverse();
	clearList();
	makeList();
}

function topicSort() {
	const topic = document.getElementById("topic").value;
	clearList();
	makeList(topic);
}
