import React, { useContext, useState, useEffect } from "react";
import Main from "../layouts/main";
import { EmployeeDataContext } from "../contextproviders/employee-data";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";

//styles
const employeeContainer = { justifyContent: "center", maxWidth: "700px" };
const employeeRow = {
  backgroundColor: "lightgrey",
  color: "black",
  margin: "10px 0px",
  padding: "5px 0px",
  fontSize: "1.1rem",
};
const searchRow = { justifyContent: "flex-end" };

const Employees = () => {
  const { employees } = useContext(EmployeeDataContext);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  //set employees when loaded into context
  useEffect(() => {
    let mounted = true;
    if (mounted) {
      setFilteredEmployees(employees);
    }
    return () => {
      mounted = false;
    };
  }, [employees]);

  const filterEmployees = (search) => {
    const searchRegEx = new RegExp(`${search}`, "i");
    if (search) {
      setFilteredEmployees(
        employees.filter((employee) => employee?.name.match(searchRegEx))
      );
    } else {
      setFilteredEmployees(employees);
    }
  };

  const sanitizeString = (str) => {
    str = str.replace(/[^a-z0-9áéíóúñü .,_-]/gim, "");
    return str.trim();
  };

  return (
    <Main>
      <Container style={employeeContainer}>
        <Row style={searchRow}>
          <Col xs="3">
            <Form.Control
              onChange={(e) => {
                filterEmployees(sanitizeString(e.target.value));
              }}
              type="text"
              placeholder="Search by Name"
            />
          </Col>
        </Row>
        {filteredEmployees.map((employee) => (
          <Row style={employeeRow} key={employee?.email}>
            <Col>{employee.name}</Col>
            <Col>{employee.location}</Col>
            <Col>{employee.email}</Col>
          </Row>
        ))}
      </Container>
    </Main>
  );
};
export default Employees;
