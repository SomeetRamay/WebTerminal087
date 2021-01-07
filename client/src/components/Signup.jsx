import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import auth from "../services/auth-service";

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: "/api/patient",
      patient: { fName: "", lName: "", username: "", password: "", email: "" },
      success: false,
      connecting: false,
      error: "",
      confirmPassword: "",
    };
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    if (this.state.confirmPassword.length === 0) {
      this.setState({ error: '"confirm password" is not allowed to be empty' });
      return;
    } else if (this.state.patient.password !== this.state.confirmPassword) {
      this.setState({ error: "Password does not match" });
      return;
    }
    this.setState({ error: "", connecting: true });
    await axios
      .post(this.state.url, this.state.patient)
      .then((r) => {
        this.setState({
          patient: {
            fName: "",
            lName: "",
            username: "",
            password: "",
            email: "",
          },
          confirmPassword: "",
        });
        this.setState({ connecting: false });
        this.setState({ success: true });
      })
      .catch((error) => {
        this.setState({ connecting: false });
        if (error.response) {
          this.setState({ error: error.response.data.message });
        } else {
          this.setState({ error: "Server error" });
        }
      });
  };
  handleFieldChange = (e) => {
    let patient = { ...this.state.patient };
    patient[e.target.name] = e.target.value;
    this.setState({ patient });
  };

  render() {
    if (auth.checkLogin()) return <Redirect to="/logs" />;

    return (
      <div className="signup ml-5 mr-5 mt-5 mb-5">
        <h2 className="h1-responsive font-weight-bold text-center my-4">
          Sign-Up
        </h2>

        {this.state.success && (
          <div className="alert alert-success">User signed up successfuly</div>
        )}
        {this.state.error && (
          <div className="alert alert-danger">{this.state.error}</div>
        )}
        {this.state.connecting && (
          <div className="alert alert-primary">Signing up...</div>
        )}

        <form className="signup-form" onSubmit={this.handleSubmit}>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label>First Name</label>
              <input
                type="text"
                className="form-control"
                id="inputFName"
                name="fName"
                value={this.state.patient.fName}
                onChange={this.handleFieldChange}
              />
            </div>
            <div className="form-group col-md-6">
              <label>Last Name</label>
              <input
                type="text"
                className="form-control"
                id="inputLName"
                name="lName"
                value={this.state.patient.lName}
                onChange={this.handleFieldChange}
              />
            </div>
          </div>

          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              className="form-control"
              id="inputUsername"
              name="username"
              value={this.state.patient.username}
              onChange={this.handleFieldChange}
            />
          </div>

          <div className="form-row">
            <div className="form-group col-md-6">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                id="inputPassword"
                name="password"
                value={this.state.patient.password}
                onChange={this.handleFieldChange}
              />
            </div>
            <div className="form-group col-md-6">
              <label>Confirm Password</label>
              <input
                type="password"
                className="form-control"
                id="confirmPassword"
                name="confirmPassword"
                value={this.state.confirmPassword}
                onChange={(e) => {
                  this.setState({ confirmPassword: e.target.value });
                }}
              />
            </div>
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              id="inutEmail"
              name="email"
              value={this.state.patient.email}
              onChange={this.handleFieldChange}
            />
          </div>

          <div className="text-center">
            <button type="submit" className="btn btn-primary text-light">
              Sign up
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default Signup;
