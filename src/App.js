import { React } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ShipmentsList } from './components/ShipmentsList';
import { AddShipmentItem } from './components/AddShipmentItem';
import { ShipmentItem } from "./components/ShipmentItem";
import { Header } from './components/Header'

function App() {
  return (
    <Router>
      <Header></Header>
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
