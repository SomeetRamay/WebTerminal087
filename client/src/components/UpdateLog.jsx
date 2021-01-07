import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import auth from "../services/auth-service";
import jwtDecode from "jwt-decode";
import axios from "axios";

class UpdateLog extends Component {
  constructor(props) {
    super(props);
    const log = props.match.params;
    this.state = {
      url: "/api/log",
      log: {
        selectedTime: log.selectedTime,
        bloodGlucose: log.bloodGlucose,
        insulinCoverage: log.insulinCoverage,
        meal: log.meal,
        carbs: log.carbs,
        calories: log.calories,
        patientId: log.patientId,
      },
      error: "",
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({ error: "" });
    axios
      .put(
        this.state.url + "/" + this.props.match.params.logId,
        this.state.log,
        {
          headers: {
            contentType: "application/json",
            Authorization: "Bearer " + localStorage.getItem("dibToken"),
          },
        }
      )
      .then((res) => {
        // console.log(res);
        alert("Log Updated");
        this.props.history.push("/logs");
      })
      .catch((error) => {
        if (error.responsee) {
          this.setState({ error: error.response.data.message });
        } else {
          this.setState({ error: "Server error" });
        }
      });
  };

  handleFieldChange = (e) => {
    let log = { ...this.state.log };
    log[e.target.name] = e.target.value;
    this.setState({ log });
  };

  render() {
    if (!auth.checkLogin()) return <Redirect to="/login" />;

    return (
      <div>
        {this.state.error && (
          <div className="alert alert-danger m-5">{this.state.error}</div>
        )}
        <form className="m-5" onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label>Select Time</label>
            <select
              id="selectTime"
              className="form-control"
              name="selectedTime"
              value={this.state.log.selectedTime}
              onChange={this.handleFieldChange}
            >
              <option value="" disabled selected>
                Select time
              </option>
              <option>Before Breakfast</option>
              <option>After Breakfast</option>
              <option>Before Lunch</option>
              <option>After Lunch</option>
              <option>Before Dinner</option>
              <option>After Dinner</option>
            </select>
          </div>

          <div className="form-group">
            <label>Blood Glucose</label>
            <div className="row">
              <div className="col-sm-11">
                <input
                  type="text"
                  className="form-control"
                  id="bloodGlucose"
                  name="bloodGlucose"
                  value={this.state.log.bloodGlucose}
                  onChange={this.handleFieldChange}
                />
              </div>
              <div className="col-sm-1">
                <label>mg/dL</label>
              </div>
            </div>
          </div>

          <div className="form-group">
            <label>Insulin Coverage</label>
            <input
              type="text"
              className="form-control"
              id="insulinCoverage"
              name="insulinCoverage"
              value={this.state.log.insulinCoverage}
              onChange={this.handleFieldChange}
            />
          </div>

          <div className="form-group">
            <label>Meal</label>
            <textarea
              className="form-control"
              id="meal"
              name="meal"
              value={this.state.log.meal}
              onChange={this.handleFieldChange}
            />
          </div>

          <div className="form-row">
            <div className="form-group col-md-6">
              <label>Total Carbs</label>
              <input
                type="text"
                className="form-control"
                id="carbs"
                name="carbs"
                value={this.state.log.carbs}
                onChange={this.handleFieldChange}
              />
            </div>
            <div className="form-group col-md-6">
              <label>Total Calories</label>
              <input
                type="text"
                className="form-control"
                id="calories"
                name="calories"
                value={this.state.log.calories}
                onChange={this.handleFieldChange}
              />
            </div>
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="btn btn-danger"
              onClick={() => {
                const token = jwtDecode(auth.getJwt());
                const log = { ...this.state.log };
                log.patientId = token.userId;
                this.setState({ log: log });
              }}
            >
              Update
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default UpdateLog;
