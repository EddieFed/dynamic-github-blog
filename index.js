"use strict";

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
        if(!DEBUG) {
            clearPage();
        }   

        posts.forEach((article) => {

            // Creates a new list element and populates it with the link
            const title = article["title"];
            let listItem = document.createElement("li");
            let link = document.createElement("a");
            link.innerText = title;
            if(!DEBUG) {
                link.href = "https://blog.eddiefed.com/posts/" + title.replace(/ /g, "-");
            }
            else{
                link.href = "http://localhost:63342/Dynamic_Github_Blog/404.html?" + title.replace(/ /g, "-");
            }
            listItem.appendChild(link);
            postList.appendChild(listItem);

        });
    });
}

function clearPage() {
    let postList = document.getElementById("postList");
    let children = Array.prototype.slice.call(postList.children);
    children.forEach((child) => {
        console.log("removed node");
        postList.removeChild(child);
    });
}

function reloadPage() {
    clearPage();
    loadPage();
}