const express = require("express");
const fs = require("fs");
const app = express();
var app = express();
app.use(express.json());
const port = 3001;

app.get("/users", (req, res) => {
  const usersData = fs.readFileSync("server/data/users.json");
  const users = JSON.parse(usersData);
  res.json(users);
});

app.post("/users", (req, res) => {
  const user = JSON.parse(req.body)
  if(!user){
    throw Error("user required")
  }
  if(!user.name){
    throw Error("user name required")
  }
  if(!user.location){
    throw Error("user location required")
  }
  if(!user.email){
    throw Error("user email required")
  }
  //todo validate email
  const usersJson = fs.readFileSync("server/data/users.json");
  let usersData = JSON.parse(usersJson);
  usersData.users = [...usersData.users, user]
  fs.writeFileSync("/server/data.users.json",JSON.stringify(usersData));
  res.send();
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
