import React, { useState, useContext } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Spinner from "react-bootstrap/Spinner";
import employeeService from "../services/employee-service";
import { useHistory } from "react-router-dom";
import { EmployeeDataContext } from "../contextproviders/employee-data";

const employeeFormContainer = {
  justifyContent: "center",
  maxWidth: "500px",
  marginTop: "30px",
  color: "black",
  backgroundColor: "lightgrey",
  paddingTop: "50px",
  fontSize: "1.1rem",
};
const formRow = { padding: "5px 0px" };
const buttonCol = { textAlign: "center", padding: "30px 0px" };
const buttonContainer = {
  justifyContent: "center",
  display: "flex",
  padding: "30px",
};
const formErrorContainer = {
  color: "red",
  display: "flex",
  justifyContent: "center",
  padding: "10px 0px",
};
const loadingStyle = {
  width: "100px",
  height: "100px",
  margin: "auto",
  marginTop: "20px",
};
const AddEmployeeForm = () => {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [email, setEmail] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const [loading, setLoading] = useState(false);
  let history = useHistory();
  const { setEmployees } = useContext(EmployeeDataContext);

  const validateForm = ({ valName, valLocation, valEmail }) => {
    const errors = [];
    if (!valName) {
      errors.push({ name: "Name required" });
    } else if (valName.length > 50) {
      errors.push({ name: "Name cannot be greater than 50 characters" });
    }
    if (!valLocation) {
      errors.push({ location: "Location required" });
    } else if (valLocation.length > 50) {
      errors.push({
        location: "Location cannot be greater than 50 characters",
      });
    }
    if (!/^.+@.+\..+$/.test(valEmail)) {
      errors.push({ email: "Invalid Email" });
    }
    return errors;
  };

  return (
    <>
      {loading ? (
        <Spinner style={loadingStyle} size="lg" animation="border" />
      ) : (
        <Form
          noValidate
          onSubmit={async (e) => {
            e.preventDefault();
            // validate form
            const errors = validateForm({
              valName: name,
              valLocation: location,
              valEmail: email,
            });
            // set form errors
            setFormErrors(
              errors.reduce((acc, err) => ({ ...acc, ...err }), {})
            );
            if (errors.length === 0) {
              try {
                setLoading(true);
                const addEmployeeResult = await employeeService.addEmployee({
                  name,
                  location,
                  email,
                });
                setEmployees(addEmployeeResult);
                history.push("/");
                setLoading(false);
              } catch (err) {
                setFormErrors({ formError: err.message });
              } finally {
                setLoading(false);
              }
            }
          }}
        >
          <Container style={employeeFormContainer}>
            {formErrors.formError && (
              <Row style={formErrorContainer}>{formErrors.formError}</Row>
            )}
            <Row style={formRow}>
              <Col xs="4">Name</Col>
              <Col>
                <Form.Control
                  required
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  isInvalid={Boolean(formErrors.name)}
                />
                <Form.Control.Feedback type="invalid">
                  {formErrors.name}
                </Form.Control.Feedback>
              </Col>
            </Row>
            <Row style={formRow}>
              <Col xs="4">Location</Col>
              <Col>
                <Form.Control
                  required
                  onChange={(e) => setLocation(e.target.value)}
                  type="text"
                  isInvalid={Boolean(formErrors.location)}
                />
                <Form.Control.Feedback type="invalid">
                  {formErrors.location}
                </Form.Control.Feedback>
              </Col>
            </Row>
            <Row style={formRow}>
              <Col xs="4">Email</Col>
              <Col>
                <Form.Control
                  required
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  isInvalid={Boolean(formErrors.email)}
                />
                <Form.Control.Feedback type="invalid">
                  {formErrors.email}
                </Form.Control.Feedback>
              </Col>
            </Row>
            <Row>
              <Col style={buttonCol}></Col>
            </Row>
          </Container>
          <Container style={buttonContainer}>
            <Button variant="primary" type="submit">
              Add Employee
            </Button>
          </Container>
        </Form>
      )}
    </>
  );
};

export default AddEmployeeForm;
