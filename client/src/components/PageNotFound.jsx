import React, { Component } from "react";
import { NavLink } from "react-router-dom";

class PageNotFound extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="container">
        <h1 className="text-center text-muted mt-5 pt-5">404|Page not found</h1>
        <h5 className="text-center mt-5">
          <NavLink className="mr-auto text-muted" to="/">
            Go to home
          </NavLink>
        </h5>
      </div>
    );
  }
}

export default PageNotFound;
