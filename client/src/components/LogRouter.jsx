import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Log from "./Log";
import AddLog from "./AddLog";
import Login from "./Login";
import UpdateLog from "./UpdateLog";

class LogRouter extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="log">
        <BrowserRouter>
          <Switch>
            <Route path="/logs/add" component={AddLog} />
            <Route
              path="/logs/update/:logId/:selectedTime/:bloodGlucose/:insulinCoverage/:meal/:carbs/:calories/:patientId"
              component={UpdateLog}
            />
            <Route path="/logs" component={Log} />
            <Route path="/login" component={Login} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default LogRouter;
