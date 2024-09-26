const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.set("Cache-Control", "no-cache");
  res.send("<h1>Hello World</h1>");
});

const port = 3000;
const host = "127.0.0.1";
app.listen(port, host, () => {
  console.log(`Server Running on ${host}:${port}`);
});
