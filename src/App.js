import React, { Component } from "react";

import "./App.css";
import Index from "./components/index";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";

class App extends Component {
  state = {
    messages: [],
    style: true,
  };

  render() {
    return (
      <div className="App" style={{ minHeight: "100vh", position: "relative" }}>
        <div className="container ">
          <div className="row">
            <div className="col">
              <Router>
                <Switch>
                  <Route path={"/:userId/:id"} component={Index}></Route>
                  <Route path={"/:userId"} component={Index}></Route>

                  {/* <Route
                  path={"/"}
                  component={() => (window.location = "http://lassoshare.com/")}
                ></Route> */}
                </Switch>
              </Router>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
