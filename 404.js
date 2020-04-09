"use strict";

const POSTS_FILE_API_URL = "https://api.github.com/repos/EddieFed/Dynamic-Github-Blog/contents/posts.json";


function loadPage() {
    const url = window.location.href;

    // Gets the title of the post I'm looking for
    let title;
    if(isDebug() === false) {
        title = url.substring(url.indexOf("posts/") + 6).replace(/-/g, " ");
    }   
    else {
        title = url.substring(url.indexOf("404.html?") + 9).replace(/-/g, " ");
    }
    console.log(title);

    fetch(POSTS_FILE_API_URL)
    .then(r => r.json())
    .then(function(d) {
        const data = JSON.parse(atob(d.content));

        const articles = data["articles"];
        // console.log(articles);

        articles.forEach((article) => {
            console.log(article["title"]);
            if(title.toLowerCase() === article["title"].toLowerCase()) {
                let post = document.getElementById("post")
                let title = document.createElement("p");
                let body = document.createElement("p");
                let date = document.createElement("p");

                title.innerText = article["title"];
                body.innerText = article["body"];
                date.innerText = article["date"];

                post.appendChild(title);
                post.appendChild(body);
                post.appendChild(date);

                return;
            }
        });
    });
}