const express = require("express");
const fs = require("fs");
var cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
const port = 3001;

app.get("/employees", (req, res) => {
  const employeesData = fs.readFileSync("server/data/employees.json");
  const employees = JSON.parse(employeesData);
  res.json(employees);
});

app.post("/employee", (req, res) => {
  const employee = req.body?.employee;
  if (!employee) {
    throw Error("employee required");
  }
  if (!employee.name) {
    throw Error("employee name required");
  }
  if (!employee.location) {
    throw Error("employee location required");
  }
  if (!employee.email) {
    throw Error("employee email required");
  }

  const employeesData = fs.readFileSync("server/data/employees.json");
  let employees = JSON.parse(employeesData);
  employees.employees = [...employees.employees, employee];
  fs.writeFileSync("server/data/employees.json", JSON.stringify(employees));
  res.json(employees);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
