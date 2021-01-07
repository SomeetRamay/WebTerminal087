import React, { Component } from "react";
import axios from "axios";

class Contact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: "/api/contact",
      contact: { name: "", email: "", subject: "", message: "" },
      success: false,
      faliure: false,
      connecting: false,
      error: "",
    };
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    this.setState({ faliure: false });
    this.setState({ connecting: true });
    await axios
      .post(this.state.url, this.state.contact)
      .then((r) => {
        this.setState({
          contact: { name: "", email: "", subject: "", message: "" },
        });
        this.setState({ faliure: false });
        this.setState({ connecting: false });
        this.setState({ success: true });
      })
      .catch((error) => {
        this.setState({ connecting: false });
        this.setState({ faliure: true });
        if (error.response) {
          this.setState({ error: error.response.data.message });
        } else {
          this.setState({ error: "Server error" });
        }
      });
  };

  handleFieldChange = (e) => {
    let contact = { ...this.state.contact };
    contact[e.target.name] = e.target.value;
    this.setState({ contact });
  };

  render() {
    return (
      <div className="contact">
        <h2 className="h1-responsive font-weight-bold text-center my-4">
          Contact
        </h2>

        <p className="text-center w-responsive mx-auto mb-5">
          Do you have any questions? Please do not hesitate to contact us
          directly. Our team will come back to you within a matter of hours to
          help you.
        </p>

        {this.state.success && (
          <div className="alert alert-success">Submitted successfuly</div>
        )}
        {this.state.faliure && (
          <div className="alert alert-danger">
            Submission failed. {this.state.error}
          </div>
        )}
        {this.state.connecting && (
          <div className="alert alert-primary">Submitting...</div>
        )}

        <div className="row ml-3 mr-2">
          <div className="col-md-9 mb-5">
            <form onSubmit={this.handleSubmit}>
              <div className="row">
                <div className="col-md-6">
                  <div className="md-form mb-0">
                    <label>Your name</label>
                    <input
                      type="text"
                      name="name"
                      value={this.state.contact.name}
                      onChange={this.handleFieldChange}
                      className="form-control"
                    />
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="md-form mb-2">
                    <label>Your email</label>
                    <input
                      type="email"
                      name="email"
                      value={this.state.contact.email}
                      onChange={this.handleFieldChange}
                      className="form-control"
                    />
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-12">
                  <div className="md-form mb-2">
                    <label>Subject</label>
                    <input
                      type="text"
                      name="subject"
                      value={this.state.contact.subject}
                      onChange={this.handleFieldChange}
                      className="form-control"
                    />
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-12">
                  <div className="md-form mb-2">
                    <label>Your message</label>
                    <textarea
                      type="text"
                      name="message"
                      rows="2"
                      value={this.state.contact.message}
                      onChange={this.handleFieldChange}
                      className="form-control md-textarea"
                    />
                  </div>
                </div>
              </div>

              <div className="text-center text-md-left">
                <button className="btn btn-primary text-light">Send</button>
              </div>
            </form>
          </div>

          <div className="col-md-3 text-center">
            <ul className="list-unstyled mb-0">
              <li>
                <i className="fas fa-map-marker-alt fa-2x" />
                <p>Lahore, Punjab, Pakistan</p>
              </li>

              <li>
                <i className="fas fa-phone mt-4 fa-2x" />
                <p>+92 331 423 999 8</p>
              </li>

              <li>
                <i className="fas fa-envelope mt-4 fa-2x" />
                <p>diabeteslog@gmail.com</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default Contact;
