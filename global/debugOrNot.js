"use strict";

function isDebug() {
    const url = window.location.href;

    if (url.includes("blog.eddiefed.com")) {
        // print("Release");
        return false;
    }
    else {
        console.warn("Debug mode!");
        return true;
    }

}