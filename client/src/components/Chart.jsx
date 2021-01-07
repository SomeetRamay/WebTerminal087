import React, { Component } from "react";
import { Line } from "react-chartjs-2";

class Chart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data,
      title: this.props.title
    };
  }
  render() {
    return (
      <div className="chart">
        <Line
          data={this.state.data}
          options={{
            title: {
              display: true,
              text: this.state.title,
              fontSize: 25
            },
            legend: {
              display: true
            },
            layout: {
              padding: { left: 50, right: 0, bottom: 0, top: 0 }
            }
          }}
        />
      </div>
    );
  }
}

export default Chart;
