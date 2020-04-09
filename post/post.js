"use strict";

const POSTS_FILE_API_URL = "https://api.github.com/repos/EddieFed/Dynamic-Github-Blog/contents/posts.json";

function post() {

    // User authentication
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const login = username + ":" + password;
    // console.info("Login -->", login)
    const authentication = ("basic " + btoa(login));
    // console.info("Authentication -->", authentication)

    // Post Data
    const title = document.getElementById("title").value;
    const article = document.getElementById("article").value;
    const topic = document.getElementById("topic").value;
    const newPageJSON = {
        "title": title,
        "body": article,
        "topic": topic,
        "date": (Date() + "")
    };

    fetch(POSTS_FILE_API_URL)
    .then(r => r.json())
    .then(function(d) {

        // Decode the last version of the posts.json from the latest commit
        const oldPostSHA = d.sha;
        const oldPostContentRAW = atob(d.content);
        const oldPostJSON = JSON.parse(oldPostContentRAW);
        console.log(oldPostJSON);

        // Make the updates posts.json
        const newPostJSON = oldPostJSON;
        newPostJSON["articles"].push(newPageJSON);
        const newPostRaw = JSON.stringify(newPostJSON);
        const newPostEncoded = btoa(newPostRaw);

        // The new PUT request body
        const requestBodyJSON = {
            "message": "New Blog post!",
            "content": newPostEncoded,
            "sha": oldPostSHA
        };
        const requestBodyRAW = JSON.stringify(requestBodyJSON);

        fetch(POSTS_FILE_API_URL, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": authentication
            },
            body: requestBodyRAW
        })
        .then(r => r.json())
        .then(function (data) {
            console.log(data);
            
        });
    });
}