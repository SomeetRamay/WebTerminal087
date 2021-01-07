import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import auth from "../services/auth-service";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: "/api/patient",
      user: { username: "", password: "" },
      error: "",
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({ error: "" });
    axios
      .post(this.state.url + "/login", this.state.user)
      .then((res) => {
        this.setState({ faliure: false });
        this.setState({ connecting: true });

        localStorage.setItem("dibToken", res.data.token);
        this.props.history.push("/logs");
        document.location.reload(true);
      })
      .catch((error) => {
        if (error.response) {
          this.setState({ error: error.response.data.message });
        } else {
          this.setState({ error: "Server error" });
        }
      });
    console.log("login");
  };

  handleFieldChange = (e) => {
    let user = { ...this.state.user };
    user[e.target.name] = e.target.value;
    this.setState({ user });
  };

  render() {
    if (auth.checkLogin()) return <Redirect to="/logs" />;

    return (
      <div className="container">
        <div className="row">
          <div className="col-md-3" />
          <div className="col-md-6">
            <h2 className="h1-responsive font-weight-bold text-center my-4">
              Log-in
            </h2>

            {this.state.error && (
              <div className="alert alert-danger">{this.state.error}</div>
            )}

            <form className="login-form ml-5 mr-5" onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label>Username</label>
                <input
                  type="text"
                  className="form-control"
                  name="username"
                  value={this.state.user.username}
                  onChange={this.handleFieldChange}
                />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="pwd"
                  name="password"
                  value={this.state.user.password}
                  onChange={this.handleFieldChange}
                />
              </div>
              <div className="text-center">
                {/* <button className="btn btn-primary text-light">Login</button> */}
                <button
                  className="btn btn-primary text-light"
                  // onclick={"document.getElementById('login-form').submit();"}
                >
                  Login
                </button>
              </div>
            </form>
          </div>
          <div className="col-md-3" />
        </div>
      </div>
    );
  }
}

export default Login;
