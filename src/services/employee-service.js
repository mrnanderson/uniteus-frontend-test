const baseUrl = "http://localhost:3001";

const getEmployees = async () => {
  const employeesResponse = await fetch(`${baseUrl}/employees`, {
    method: "GET",
    mode: "cors",
    headers: { "content-type": "application/json" },
  });
  const employeeJson = await employeesResponse.json();
  return employeeJson?.employees;
};

const addemployee = async ({ name, location, email }) => {};

const employeeService = { getEmployees, addemployee };
export default employeeService;
