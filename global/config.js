"use strict";

let DEBUG;
const POSTS_FILE_API_URL = "https://api.github.com/repos/EddieFed/Dynamic-Github-Blog/contents/posts.json";
const url = window.location.href;

if (url.includes("blog.eddiefed.com")) {
    DEBUG = false;
}
else {
    console.warn("Debug mode!");
    DEBUG = true;
}
