import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import auth from "../services/auth-service";
import Joi from "joi";

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: "/api/patient",
      patient: {
        _id: "",
        fName: "",
        lName: "",
        username: "",
        password: "",
        email: "",
      },
      success: "",
      error: "",
      password: {
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      },
      passwordChangeError: "",
      passwordChangeSuccess: "",
      pass: "",
    };
    this.getUser();
  }

  getUser = () => {
    if (auth.checkLogin()) {
      axios
        .get(this.state.url + "/" + auth.getPatientId(), {
          headers: {
            contentType: "application/json",
            Authorization: "Bearer " + localStorage.getItem("dibToken"),
          },
        })
        .then((res) => {
          this.setState({ patient: res.data });
        })
        .catch((error) => {
          if (error.response) {
            this.setState({ error: error.response.data.message });
          } else {
            this.setState({ error: "Server error" });
          }
        });
    }
  };

  updateUserDetails = () => {
    const patient = {
      fName: this.state.patient.fName,
      lName: this.state.patient.lName,
      email: this.state.patient.email,

      username: this.state.patient.username,
      password: this.state.patient.password,
    };
    axios
      .put(this.state.url + "/" + this.state.patient._id, patient, {
        headers: {
          contentType: "application/json",
          Authorization: "Bearer " + localStorage.getItem("dibToken"),
        },
      })
      .then((res) => {
        this.getUser();
        this.setState({ success: "Updated User Details" });
      })
      .catch((error) => {
        if (error.response) {
          this.setState({ error: error.response.data.message });
        } else {
          this.setState({ error: "Server error" });
        }
      });
  };

  handleUserDetailFieldChange = (e) => {
    let patient = { ...this.state.patient };
    patient[e.target.name] = e.target.value;
    this.setState({ patient });
  };

  handlePasswordFieldChange = (e) => {
    let password = { ...this.state.password };
    password[e.target.name] = e.target.value;
    this.setState({ password });
  };

  handleUserDetailSubmit = (e) => {
    e.preventDefault();
    this.updateUserDetails();
  };

  checkPassword = () => {
    const passwordSchema = {
      newPassword: Joi.string().required().min(8).max(16),
    };

    if (this.state.password.currentPassword === this.state.patient.password) {
      const { error } = Joi.validate(
        { newPassword: this.state.password.newPassword },
        passwordSchema
      );

      if (error) {
        this.setState({ passwordChangeError: error.details[0].message });
        return;
      }

      if (
        this.state.password.currentPassword === this.state.password.newPassword
      ) {
        this.setState({
          passwordChangeError:
            "New password can not be same as previous password",
        });
        return;
      }

      if (
        this.state.password.newPassword === this.state.password.confirmPassword
      ) {
        this.changePassword();
      } else {
        this.setState({
          passwordChangeError:
            "New password and confirm password does not match",
        });
      }
    } else {
      this.setState({ passwordChangeError: "Invalid Password" });
      return;
    }
  };

  changePassword = () => {
    axios
      .put(
        this.state.url + "/changePassword/" + this.state.patient._id,
        { password: this.state.password.newPassword },
        {
          headers: {
            contentType: "application/json",
            Authorization: "Bearer " + localStorage.getItem("dibToken"),
          },
        }
      )
      .then((res) => {
        this.setState({ passwordChangeSuccess: "Password Changed" });
        this.clearPasswordFields();
        this.getUser();
      })
      .catch((error) => {
        if (error.response) {
          this.setState({ passwordChangeError: error.response.data.message });
        } else {
          this.setState({ passwordChangeError: "Server error" });
        }
      });
  };

  handlePasswordSubmit = (e) => {
    e.preventDefault();
    this.setState({ passwordChangeError: "", passwordChangeSuccess: "" });
    this.checkPassword();
  };

  clearPasswordFields = () => {
    const password = {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    };
    this.setState({
      password,
    });
    this.forceUpdate();
  };

  render() {
    if (!auth.checkLogin()) return <Redirect to="/login" />;

    return (
      <div className="signup ml-5 mr-5 mt-5 mb-5">
        <h2 className="h1-responsive font-weight-bold text-center my-4">
          Settings
        </h2>

        <h3>User Details</h3>

        <form onSubmit={this.handleUserDetailSubmit}>
          {this.state.success && (
            <div className="alert alert-success">{this.state.success}</div>
          )}
          {this.state.error && (
            <div className="alert alert-danger">{this.state.error}</div>
          )}

          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              className="form-control"
              id="inputUsername"
              name="username"
              value={this.state.patient.username}
              disabled
            />
          </div>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label>First Name</label>
              <input
                type="text"
                className="form-control"
                id="inputFName"
                name="fName"
                value={this.state.patient.fName}
                onChange={this.handleUserDetailFieldChange}
                required
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
                onChange={this.handleUserDetailFieldChange}
                required
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
              onChange={this.handleUserDetailFieldChange}
              required
            />
          </div>

          <div className="text-center">
            <button type="submit" className="btn btn-primary text-light">
              Update
            </button>
          </div>
        </form>

        <hr />

        <h3>Password</h3>
        <form onSubmit={this.handlePasswordSubmit}>
          {this.state.passwordChangeSuccess && (
            <div className="alert alert-success">
              {this.state.passwordChangeSuccess}
            </div>
          )}
          {this.state.passwordChangeError && (
            <div className="alert alert-danger">
              {this.state.passwordChangeError}
            </div>
          )}

          <div className="form-group">
            <label>Current Password</label>
            <input
              type="password"
              className="form-control"
              id="currentPassword"
              name="currentPassword"
              value={this.state.password.currentPassword}
              onChange={this.handlePasswordFieldChange}
              required
            />
          </div>

          <div className="form-group">
            <label>New Password</label>
            <input
              type="password"
              className="form-control"
              id="newPassword"
              name="newPassword"
              value={this.state.password.newPassword}
              onChange={this.handlePasswordFieldChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Confirm Password</label>
            <input
              type="password"
              className="form-control"
              id="confirmPassword"
              name="confirmPassword"
              value={this.state.password.confirmPassword}
              onChange={this.handlePasswordFieldChange}
              required
            />
          </div>

          <div className="text-center">
            <button type="submit" className="btn btn-primary text-light">
              Change
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default Settings;
