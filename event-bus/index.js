const { randomBytes } = require("crypto");
const express = require("express");

const app = express();
app.use(express.json());

const posts = {};

app.post("/events", async (req, res) => {
  const event = req.body;
  try {
    await axios.post("http://localhost:4000/events", event);
    await axios.post("http://localhost:4001/events", event);
    await axios.post("http://localhost:4002/events", event);
    res.send({ status: "ok" });
  } catch (e) {
    console.log(e);
  }
});

app.listen(4005, () => {
  console.log("listening on 4005");
});
