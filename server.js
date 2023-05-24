const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

// Array to store blog posts
let blogPosts = [];

//Home Route
app.get("/", (req, res) => {
	res.status(200).send("Basic Blog App");
});

// Get all blog posts
app.get("/blogs", (req, res) => {
	res.status(200).json(blogPosts);
});

// Add a new blog post
app.post("/blogs", (req, res) => {
	const { title, content } = req.body;

	const newPost = {
		id: blogPosts.length + 1,
		title,
		content,
	};

	blogPosts.push(newPost);
	res.status(200).json(newPost);
});

// Delete a blog post
app.delete("/blogs/:id", (req, res) => {
	const { id } = req.params;

	// Find the index of the blog post with the given id
	const index = blogPosts.findIndex((post) => post.id === parseInt(id));

	if (index !== -1) {
		// Remove the blog post from the array
		const deletedPost = blogPosts.splice(index, 1)[0];
		res.status(200).json(deletedPost);
	} else {
		res.status(404).json({ message: "Blog post not found" });
	}
});

// Update a blog post
app.put("/blogs/:id", (req, res) => {
	const { id } = req.params;
	const { title, content } = req.body;

	// Find the index of the blog post with the given id
	const index = blogPosts.findIndex((post) => post.id === parseInt(id));

	if (index !== -1) {
		// Update the blog post with the new title and content
		blogPosts[index].title = title;
		blogPosts[index].content = content;
		res.status(200).json(blogPosts[index]);
	} else {
		res.status(404).json({ message: "Blog post not found" });
	}
});

// Replace a blog post
app.put("/blogs/replace/:id", (req, res) => {
	const { id } = req.params;
	const { title, content } = req.body;

	// Find the index of the blog post with the given id
	const index = blogPosts.findIndex((post) => post.id === parseInt(id));

	if (index !== -1) {
		// Create a new blog post object with the new title and content
		const replacedPost = {
			id: blogPosts[index].id,
			title,
			content,
		};

		// Replace the blog post in the array
		blogPosts[index] = replacedPost;
		res.status(200).json(replacedPost);
	} else {
		res.status(404).json({ message: "Blog post not found" });
	}
});

// Start the server
app.listen(4000, () => {
	console.log("Server is running on port 4000");
});
