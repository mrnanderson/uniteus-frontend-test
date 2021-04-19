import "bootswatch/dist/slate/bootstrap.min.css";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/adduser">
          <h1>Add User</h1>
        </Route>
        <Route path="/">
          <h1>Users</h1>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
