const { randomBytes } = require("crypto");
const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(express.json());
app.use(cors());

const posts = {};

app.get("/posts", (req, res) => {
  res.send(posts);
});

app.post("/posts", async (req, res) => {
  const id = randomBytes(4).toString("hex");
  const { title } = req.body;

  // store post data
  posts[id] = { id, title };

  // emit event
  await axios.post("http://localhost:4005/events", {
    type: "PostCreated",
    data: { id, title },
  });

  // return response to client
  res.status(201).send(posts[id]);
});

app.post("/events", (req, res) => {
  console.log("rec event", req.body.type);
  res.send();
});

app.listen(4000, () => {
  console.log("listening on 4000");
});
