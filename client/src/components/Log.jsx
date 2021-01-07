import React, { Component } from "react";
import { NavLink, Redirect } from "react-router-dom";
import axios from "axios";
import auth from "../services/auth-service";
import Chart from "./Chart";

class Log extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: "/api/log",
      logs: [],
      readingDates: [],
      glucoseReads: [],
      insulinReads: [],
      chartData: {},
      check: false,
      error: "",
    };
    if (auth.checkLogin()) {
      this.getLogs();
    }
  }

  componentDidUpdate = () => {
    this.populateChart();
  };

  deleteLog = (logId) => {
    axios
      .delete(this.state.url + "/" + logId)
      .then((res) => {
        alert("deleted " + res.data);
        this.getLogs();
      })
      .catch((error) => {
        if (error.responsee) {
          this.setState({ error: error.response.data.message });
        } else {
          this.setState({ error: "Server error" });
        }
      });
  };

  getLogs = () => {
    const patietnId = auth.getPatientId();
    axios
      .get(this.state.url + "/" + patietnId, {
        headers: {
          contentType: "application/json",
          Authorization: "Bearer " + localStorage.getItem("dibToken"),
        },
      })
      .then((res) => {
        this.setState({ logs: res.data });
      })
      .catch((error) => {
        this.props.history.push("/login");
      });
  };

  populateChart = () => {
    if (!this.state.check) {
      const logs = this.state.logs;

      logs.forEach((log) => {
        //adding log reading dates in chart label
        const date = this.state.readingDates.push(log.date.split("T")[0]);
        this.setState({ readingDates: date });

        //adding bloodGlucose  reading in chart
        const glucose = this.state.glucoseReads.push(log.bloodGlucose);
        this.setState({ glucoseReads: glucose });

        //adding insulinCoverage in chart
        const insulin = this.state.insulinReads.push(log.insulinCoverage);
        this.setState({ insulinReads: insulin });
      });

      const data = {
        labels: this.state.readingDates,
        datasets: [
          {
            label: "Blood Glucose",
            backgroundColor: "rgba(153,102,255,0.6)",
            data: this.state.glucoseReads,
          },
          {
            label: "Insulin Coverage",
            backgroundColor: "rgba(54,162,235,0.6)",
            data: this.state.insulinReads,
          },
        ],
      };

      this.setState({ chartData: data });
      this.setState({ check: true });
    }
  };

  render() {
    if (!auth.checkLogin()) return <Redirect to="/login" />;

    return (
      <React.Fragment>
        {this.state.error && (
          <div className="alert alert-danger m-5">{this.state.error}</div>
        )}

        {this.state.logs.length !== 0 && (
          <div>
            {this.state.check && (
              <div className="w-50 m-auto">
                <Chart data={this.state.chartData} title="Graph" />
              </div>
            )}
            <div className="table-responsive-sm table-hover table-sm p-5">
              <table className="table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Recorded At</th>
                    <th>Time</th>
                    <th>Blood Glucose</th>
                    <th>Insulin</th>
                    <th>Meal</th>
                    <th>Carbs</th>
                    <th>Calories</th>
                    <th>Operations</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.logs.map((l) => (
                    <tr key={l._id}>
                      <td>{l.date.split("T")[0]}</td>
                      <td>{l.date.split("T")[1].split(".")[0]}</td>
                      <td>{l.selectedTime}</td>
                      <td>{l.bloodGlucose}</td>
                      <td>{l.insulinCoverage}</td>
                      <td>{l.meal}</td>
                      <td>{l.carbs}</td>
                      <td>{l.calories}</td>
                      <td>
                        <NavLink
                          to={
                            "/logs/update/" +
                            l._id +
                            "/" +
                            l.selectedTime +
                            "/" +
                            l.bloodGlucose +
                            "/" +
                            l.insulinCoverage +
                            "/" +
                            l.meal +
                            "/" +
                            l.carbs +
                            "/" +
                            l.calories +
                            "/" +
                            auth.getPatientId()
                          }
                          className="btn btn-primary btn-sm mr-2"
                        >
                          <span className="fa fa-recycle" />
                        </NavLink>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => {
                            this.deleteLog(l._id);
                          }}
                        >
                          <span className="fa fa-trash" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {this.state.logs.length === 0 && (
          <p className="text-center m-5">No logs have been entered</p>
        )}

        <div className="text-center">
          <NavLink className="btn btn-primary" to="/logs/add">
            Add
          </NavLink>
        </div>
      </React.Fragment>
    );
  }
}

export default Log;
