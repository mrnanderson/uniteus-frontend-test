const express = require("express");
const fs = require("fs");
const app = express();
const port = 3001;

app.get("/users", (req, res) => {
  const usersData = fs.readFileSync("data/users.json");
  const users = JSON.parse(usersData);
  res.json(users);
});

app.post("/users", (req, res) => {});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
