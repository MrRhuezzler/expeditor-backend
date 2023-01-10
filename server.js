require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { Target } = require("./models");
const app = express();
const port = 5000;
const url = process.env.MONGODB_URL;

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));

db.once("open", () => {
  console.log("Connection Successful!");
});

app.get("/", function (req, res) {
  res.status(201).send("Hello from Expeditor");
});

app.post("/target", function (req, res) {
  const target = new Target({ ...req.body });

  target.save((err) => {
    if (err) res.status(401).json({ message: "error" });
    else res.status(201).json(target);
  });
});

app.get("/target/:id", function (req, res) {
  Target.find({ _id: req.params.id }, (err, target) => {
    if (err) res.status(404).json({ message: "error" });
    else res.status(200).send(target);
  });
});

app.get("/target", function (req, res) {
  Target.find((err, targets) => {
    if (err) res.status(401).send([]);
    else res.status(200).send(targets);
  });
});

app.listen(port, async () => {
  mongoose.connect(url);
  console.log(`Application listening on port ${port}`);
});
