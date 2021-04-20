import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";

const navRow = { justifyContent: "center", display: "flex", padding: "10px" };
const navCol = { justifyContent: "center", display: "flex" };
const link = { width: "244px" };

const TopNav = () => (
  <Row style={navRow}>
    <Col sm="4" md="3" xl="2" style={navCol}>
      <Link to="/">
        <h1 style={link}>Employees</h1>
      </Link>
    </Col>
    <Col sm="4" md="3" xl="2" style={navCol}>
      <Link to="/add">
        <h1 style={link}>Add Employee</h1>
      </Link>
    </Col>
  </Row>
);

export default TopNav;
