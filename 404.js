"use strict";

function loadPage() {
    const url = window.location.href;

    // Gets the title of the post I'm looking for
    let title;
    if(!DEBUG) {
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

        articles.forEach((article) => {
            console.log(article["title"]);
            if(title.toLowerCase() === article["title"].toLowerCase()) {
                let post = document.getElementById("post")
                let title = document.createElement("h1");
                let body = document.createElement("p");
                let date = document.createElement("tt");

                title.innerText = article["title"];
                body.innerHTML = article["body"];
                date.innerText = article["date"];

                post.appendChild(title);
                post.appendChild(date);
                post.appendChild(document.createElement("hr"))
                post.appendChild(body);

                return("Found Article");
            }
        });
    });
}