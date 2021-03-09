const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express(),
  randomId = require("random-id");
bodyParser = require("body-parser");
port = 3080;

const idlen = 10;
const heroes = [];
let tasks = [];
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "../ui/build")));

app.get("/api/heroes", (req, res) => {
  console.log("api/heroes called!");
  res.json(heroes);
});

app.post("/api/hero", (req, res) => {
  const hero = req.body.hero;
  const id = randomId(idlen);
  hero.id = id;
  heroes.push(hero);
  res.json({ status: true, message: `hero ${hero.id} addedd` });
});

app.delete("/api/hero/:id", (req, res) => {
  console.log("deleting hero:::", req.params.id);
  const id = req.params.id;
  heroes = heroes.filter((hero) => hero.id !== id);
  res.json({ status: true, message: `hero ${id} deleted` });
});

app.put("/api/hero", (req, res) => {
  const hero = req.body.task;
  heroes = heroes.map((hro) => {
    if (hro.id === hero.id) hro = hero;
    return hro;
  });
  res.json({ status: true, message: `hero ${hero.id} edited` });
});

app.listen(port, () => {
  console.log(`Server listening on the port::${port}`);
});
