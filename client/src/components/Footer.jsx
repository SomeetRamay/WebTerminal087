import React, { Component } from "react";
import { NavLink } from "react-router-dom";

class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <footer className="font-small bg-dark text-white w-100 mt-5 mb-0">
        <div className="container">
          <div className="row text-center d-flex justify-content-center pt-5 mb-3">
            <div className="col-md-2 mb-3">
              <h6 className="text-uppercase font-weight-bold">
                <NavLink className="text-light" to="/about">
                  About
                </NavLink>
              </h6>
            </div>

            <div className="col-md-2 mb-3">
              <h6 className="text-uppercase font-weight-bold">
                <NavLink className="text-light" to="/help">
                  Help
                </NavLink>
              </h6>
            </div>

            <div className="col-md-2 mb-3">
              <h6 className="text-uppercase font-weight-bold">
                <NavLink className="text-light" to="/contact">
                  Contact
                </NavLink>
              </h6>
            </div>
          </div>

          <hr className="bg-light" />

          <div className="row d-flex text-center justify-content-center mb-md-0 mb-4">
            <div className="col-md-8 col-12 mt-5">
              <h3>Important Safety Information & Disclaimer</h3>
              <p>
                The information and statistical data provided by{" "}
                {this.props.appName} application is only to help you to track
                how the diabetes treatment affects your overall condition. All
                decisions about your diabetes therapy must be taken after
                consulting with your diabetes specialist.
              </p>
            </div>
          </div>

          <hr className="bg-light" />
        </div>
        <div className="footer-copyright text-center py-3">
          © 2018 Copyright:
          <NavLink className="text-light ml-2" to="/">
            {this.props.appName}.org
          </NavLink>
        </div>
      </footer>
    );
  }
}

export default Footer;
