import "bootswatch/dist/slate/bootstrap.min.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Employees from "./pages/employees";
import AddEmployee from "./pages/add-employee";
import { EmployeeDataProvider } from "./contextproviders/employee-data";

function App() {
  return (
    <Router>
      <EmployeeDataProvider>
        <Switch>
          <Route path="/add">
            <AddEmployee />
          </Route>
          <Route path="/">
            <Employees />
          </Route>
        </Switch>
      </EmployeeDataProvider>
    </Router>
  );
}

export default App;
