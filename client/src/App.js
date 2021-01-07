import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./components/Home";
import About from "./components/About";
import Contact from "./components/Contact";
import Login from "./components/Login";
import Signup from "./components/Signup";
import LogRouter from "./components/LogRouter";
import PageNotFound from "./components/PageNotFound";
import Settings from "./components/Settings";
// import auth from "./services/auth-service";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { appName: "Diabetes Log" };
  }
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Header appName={this.state.appName} />
          <Switch>
            <Route path="/signup" component={Signup} />
            <Route path="/login" component={Login} />
            <Route path="/contact" component={Contact} />
            <Route path="/about" component={About} />
            <Route path="/logs" component={LogRouter} />
            <Route path="/settings" component={Settings} />
            <Route exact path="/" component={Home} />
            <Route path="*" component={PageNotFound} />
          </Switch>
          <Footer appName={this.state.appName} />
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
