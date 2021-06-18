const { randomBytes } = require("crypto");
const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(express.json());
app.use(cors());

const commentsByPostId = {};

app.get("/posts/:id/comments", (req, res) => {
  res.send(commentsByPostId[req.params.id] || []);
});

app.post("/posts/:id/comments", async (req, res) => {
  const commentId = randomBytes(4).toString("hex");
  const postId = req.params.id;
  const comments = commentsByPostId[postId] || [];
  const { content } = req.body;

  // store comment
  comments.push({ id: commentId, content });
  commentsByPostId[postId] = comments;

  // emit event
  await axios.post("http://localhost:4005/events", {
    type: "CommentCreated",
    data: { id: commentId, content, postId },
  });

  // return response to client
  res.status(201).send(comments);
});

app.post("/events", (req, res) => {
  console.log("rec event", req.body.type);
  res.send();
});

app.listen(4001, () => console.log("listening on 4001"));
