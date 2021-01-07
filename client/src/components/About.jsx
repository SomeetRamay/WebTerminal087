import React, { Component } from "react";

class About extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="about">
        <h2 className="h1-responsive font-weight-bold text-center my-4">
          About
        </h2>
        <p className="text-center w-responsive mx-auto mb-5">
          {this.props.appName} is a free app. This app is espacially designed
          for the patients with diabetes. It records blood pressure and suger
          level on daily basics. And provide a helpful report.{" "}
        </p>
      </div>
    );
  }
}

export default About;
