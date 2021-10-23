import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import ShipmentsList from './components/ShipmentsList';
import { AddShipmentItem } from './components/AddShipmentItem';
import { ShipmentItem } from "./components/ShipmentItem";

function App() {
  return (
    <Router>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/shipments" className="navbar-brand">
          Shipments
        </a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/shipments"} className="nav-link">
              Shipments
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/add"} className="nav-link">
              Add
            </Link>
          </li>
        </div>
      </nav>

      <div className="container mt-3">
        <Switch>
          <Route exact path={["/", "/shipments"]} component={ShipmentsList} />
          <Route exact path="/add" component={AddShipmentItem} />
          <Route path="/shipments/:id" component={ShipmentItem} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
