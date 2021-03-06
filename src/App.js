import React, { Component } from "react";

import "./App.css";
import Index from "./components/index";
import { Switch, Route } from "react-router-dom";

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
              <Switch>
                <Route
                  sensitive
                  path={"/:userId/:id"}
                  component={Index}
                ></Route>
                <Route path={"/:userId"} component={Index} sensitive></Route>
                <Route
                  path={"/"}
                  component={() => (window.location = "http://lassoshare.com/")}
                ></Route>
              </Switch>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
