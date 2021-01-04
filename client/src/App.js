import "./App.css";
import Login from "./Pages/Login/Login";
import Nav from "./components/Nav/Nav";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Warehouse from "./Pages/Warehouse/Warehouse";
import { useStateValue } from "./Context/StateProvider";
import Sales from "./Pages/Sales/Sales";

function App() {
  const [{ user }, dispatchUser] = useStateValue();
  const [{ admin }, dispatchAdmin] = useStateValue();

  return (
    <>
      {!admin && !user ? (
        <Login />
      ) : (
        <Router>
          <Nav />

          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/warehouse">
              <Warehouse />
            </Route>
            <Route exact path="/sales">
              <Sales />
            </Route>

            <Route exact path="/login">
              <Login />
            </Route>
          </Switch>
        </Router>
      )}
    </>
  );
}

export default App;
