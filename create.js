function create() {
	let postTitle = document.getElementById("title").value;
	let postTopics = document.getElementById("topics").value;
	const date = new Date();

	const auth = "basic " + btoa(document.getElementById("password").value);

	const postTemplate = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>${postTitle}</title>
        <link rel="shortcut icon" href="https://www.eddiefed.com/favicon.ico" />
    
    </head>
    <body>
    
        <div class="post">
            <h1 class="title">${postTitle}</h1>
            <h4 class="topics">${postTopics}</h4>
            <tt class="date">${date + ""}</tt>
            <hr>
            <div class="body">${document.getElementById("article").value}</div>  
        </div>
    
    </body>
    </html>
    `;

	// Create post html file
	fetch(`https://api.github.com/repos/eddiefed/dynamic-github-blog/contents/posts/${(postTitle.toLowerCase()).replace(/ /g, "-")}.html`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
			"Authorization": auth
		},
		body: JSON.stringify({
			"message": postTitle,
			"content": btoa(postTemplate)
		})
	})
	.then(r => r.json())
	.then(d => {

		// Update db.json
		fetch(`https://api.github.com/repos/eddiefed/dynamic-github-blog/contents/posts/db.json`)
			.then(r2 => r2.json())
			.then(d2 => {
				let content = JSON.parse(atob(d2["content"]));
				content["posts"].push([postTitle, ((date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear()), postTopics.split(" ")]);

				postTopics.split(" ").forEach(i => {
					if (!content["topics"].includes(i)) {
						content["topics"].push(i);
					}
				});

				fetch(`https://api.github.com/repos/eddiefed/dynamic-github-blog/contents/posts/db.json`, {
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
						"Authorization": auth
					},
					body: JSON.stringify({
						"message": postTitle,
						"content": btoa(JSON.stringify(content)),
						"sha": d2["sha"]
					})
				})
					.then(r3 => r3.json())
					.then();
		});
	});
}
