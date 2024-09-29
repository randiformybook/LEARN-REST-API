const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");

app.use(
  cors({
    origin: "*",
    methods: "GET",
  })
);

// Middleware untuk melayani file static di public (untuk kebutuhan aplikasi sendiri)
app.use(express.static(path.join("public")));

// Middleware CORS, hanya berlaku untuk rute coba.json
app.get("/DATA/coba.json", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "DATA", "coba.json"));
});

// Middleware untuk memeriksa domain lain hanya bisa mengakses coba.json
app.use((req, res, next) => {
  const origin = req.get("origin");
  const allowPath = ["/DATA/coba.json", "/DATA/menu.json"];
  if (origin && !allowPath.includes(req.path)) {
    return res.status(403).send("Access Forbidden");
  }
  // Middleware untuk melayani file static di public (untuk kebutuhan aplikasi sendiri)
  next();
});

app.get("/", (req, res) => {
  res.send("<h1>First Page is Running</h1>");
});

// Apabila URL halaman tidak di temukan
app.use("/", (req, res) => {
  res.status(404).send("Page is not Found !");
});

const port = 3000;
const host = "127.0.0.1";
app.listen(port, host, () => {
  console.log(`Server Running on ${host}:${port}`);
});
