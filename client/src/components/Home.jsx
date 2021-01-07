import React, { Component } from "react";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="introduction">
        <h2 className="h1-responsive font-weight-bold text-center my-4">
          Welcome To {this.state.appName}
        </h2>
        <p className="text-center w-responsive mx-auto mb-2">
          The ultimate way to understand and manage you diabetes
        </p>
        <div className="text-center">
          <ul className="list-unstyled mb-0">
            <li>Log your values wherever you are</li>
            <li>Analyze and understand data at a glance</li>
            <li>Keep you diabetes under control</li>
          </ul>
        </div>
      </div>
    );
  }
}

export default Home;
