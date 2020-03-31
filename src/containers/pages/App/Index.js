import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route} from "react-router-dom";
import Dashboard from "../Dashboard/Dashboard";
import Login from "../Login/Login";
import Register from "../Register/Register";
import { Provider } from "react-redux";
import { store } from "../../../config/redux";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Route path="/" exact component={Dashboard} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
      </Router>
    </Provider>
  );
}

export default App;
