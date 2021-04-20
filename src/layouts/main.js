import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import TopNav from "../framework/top-nav";

const topRow = { justifyContent: "center", padding: "20px 10px 50px 10px" };

const Main = ({ children }) => {
  return (
    <Container fluid>
      <Row style={topRow}>
        <h1>Unite Us</h1>
      </Row>
      <TopNav />
      <Row>{children}</Row>
    </Container>
  );
};

export default Main;
