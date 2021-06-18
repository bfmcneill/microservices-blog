const { randomBytes } = require("crypto");
const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const commentsByPostId = {};

app.get("/posts/:id/comments", (req, res) => {
  res.send(commentsByPostId[req.params.id] || []);
});

app.post("/posts/:id/comments", (req, res) => {
  const commentId = randomBytes(4).toString("hex");
  //console.log("commentId", commentId);

  const postId = req.params.id;
  const comments = commentsByPostId[postId] || [];

  const { content } = req.body;
  comments.push({ id: commentId, content });
  //console.log("comments", comments);

  commentsByPostId[postId] = comments;
  res.status(201).send(comments);
});

app.listen(4001, () => console.log("listening on 4001"));
