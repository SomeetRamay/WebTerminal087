import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import jwtDecode from "jwt-decode";
import auth from "../services/auth-service";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <React.Fragment>
        <nav className="navbar navbar-expand-md bg-dark navbar-dark sticky-top">
          <NavLink className="navbar-brand" to="/">
            <span className="fa fa-medkit mr-2" />
            {this.props.appName}
          </NavLink>

          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#collapsibleNavbar"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="collapsibleNavbar">
            <ul className="navbar-nav">
              <li className="nav-item">
                <NavLink className="nav-link text-light" to="/">
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link text-light" to="/logs">
                  Logs
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link text-light" to="/contact">
                  Contact
                </NavLink>
              </li>
            </ul>
          </div>

          {!auth.checkLogin() && (
            <div className="collapse navbar-collapse" id="collapsibleNavbar">
              <ul className="nav navbar-nav ml-auto" id="collapsibleNavbar">
                <li>
                  <NavLink className="nav-link text-light" to="/signup">
                    <span className="fa fa-user text-white" /> Sign Up
                  </NavLink>
                </li>
                <li>
                  <NavLink className="nav-link text-light" to="/login">
                    <span className="fa fa-sign-in-alt text-white" /> Login
                  </NavLink>
                </li>
              </ul>
            </div>
          )}

          {auth.checkLogin() && (
            <div className="collapse navbar-collapse" id="collapsibleNavbar">
              <ul className="nav navbar-nav ml-auto" id="collapsibleNavbar">
                <li className="nav-item dropdown">
                  <button
                    className="btn btn-outline-info dropdown-toggle text-light"
                    id="navbarDropdownMenuLink"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    {jwtDecode(auth.getJwt()).username}
                  </button>
                  <div
                    className="dropdown-menu dropdown-menu-right"
                    aria-labelledby="navbarDropdownMenuLink"
                  >
                    <NavLink className="dropdown-item" to="/settings">
                      <span className="fa fa-cog"></span> Settings
                    </NavLink>
                    <div className="dropdown-divider"></div>
                    <NavLink
                      className="dropdown-item"
                      onClick={() => {
                        auth.logout();
                        document.location.reload(true);
                      }}
                      to="/login"
                    >
                      <span className="fa fa-sign-out-alt"></span> Logout
                    </NavLink>
                  </div>
                </li>
              </ul>
            </div>
          )}
        </nav>
      </React.Fragment>
    );
  }
}

export default Header;
