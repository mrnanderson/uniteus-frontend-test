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

const addEmployee = async ({ name, location, email }) => {
  const addEmployeeResponse = await fetch(`${baseUrl}/employee`, {
    method: "POST",
    mode: "cors",
    headers: { "content-type": "application/json", Accept: "application/json" },
    body: JSON.stringify({ employee: { name, location, email } }),
  });
  const addEmployeeJson = await addEmployeeResponse.json();
  // simulate loading 2.5 seconds
  await new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 2500);
  });
  return addEmployeeJson?.employees;
};

const employeeService = { getEmployees, addEmployee };
export default employeeService;
