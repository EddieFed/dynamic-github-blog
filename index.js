"use strict";

const POSTS_FILE_API_URL = "https://api.github.com/repos/EddieFed/Dynamic-Github-Blog/contents/posts.json";

function loadPage() {
    console.clear();

    fetch(POSTS_FILE_API_URL)
    .then(r => r.json())
    .then(function(d) {
        const postsFileJSON = JSON.parse(atob(d.content));
        
        const sort = document.getElementById("sort").selectedIndex;
        console.log("Sort index", sort);
        let posts;
        if(sort === 1) {    // Oldest
            posts = postsFileJSON["articles"];
        }
        else {              // Newest
            posts = postsFileJSON["articles"].reverse()
        }

        // Accesses the blank unordered list
        let postList = document.getElementById("postList");

        // Clears any dummy data I have in the file... Only temporary
        if(isDebug() === false) {
            clearPage();
        }   

        posts.forEach((article) => {

            // Creates a new list element and populates it with the link
            const title = article["title"];
            let listItem = document.createElement("li");
            let link = document.createElement("a");
            link.innerText = title;
            link.href = "https://blog.eddiefed.com/articles/" + title.replace(/ /g, "-");

            listItem.appendChild(link);
            postList.appendChild(listItem);

        });
    });
}

function clearPage() {
    let postList = document.getElementById("postList");
    var children = Array.prototype.slice.call(postList.children);
    children.forEach((child) => {
        console.log("removed node");
        postList.removeChild(child);
    });
}

function reloadPage() {
    clearPage();
    loadPage();
}