import React, { Component } from "react";
import "../App.css";
import { connect } from "react-redux";
import { createAccount } from "../actions/accountActions";
import { fetchCountries } from "../actions/countryActions";
import PropTypes from "prop-types";
import Header from "./header";
import Add from "@material-ui/icons/Add";
import AccountCircle from "@material-ui/icons/AccountCircle";

const emailRegex = RegExp(
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

const formValid = ({ formErrors, ...rest }) => {
  let valid = true;

  Object.values(formErrors).forEach(val => val.length > 0 && (valid = false));

  Object.values(rest).forEach(val => {
    val === null && (valid = false);
  });

  return valid;
};

class SignupPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      background: AccountCircle,
      selectedFile: null,
      submitReady: false,
      userName: null,
      password: null,
      email: null,
      firstName: null,
      lastName: null,
      country: "Choose Your Country",
      formErrors: {
        userName: "",
        password: "",
        email: "",
        firstName: "",
        lastName: "",
        country: "",
        formError: ""
      }
    };
  }

  componentDidMount() {
    this.setState({ country: "Choose Your Country" });
    this.props.fetchCountries();
  }

  handleSelectedFile = event => {
    console.log("this is event", event);
    console.log("selectedfile", event.target.files[0]);
    this.setState({ selectedFile: event.target.files[0] });
  };

  handleSubmit = e => {
    e.preventDefault();
    if (formValid(this.state)) {
      console.log(`Submitting
      Username: ${this.state.userName}
      Password: ${this.state.password}
      Email: ${this.state.email}
      First Name: ${this.state.firstName}
      Last Name: ${this.state.lastName}
      Country: ${this.state.country}`);
    } else {
      console.error("FORM INVALID");
    }

    if (formValid(this.state)) {
      let formData = new FormData();

      formData.append("file", this.state.selectedFile);
      formData.append("userName", this.state.userName);
      formData.append("password", this.state.password);
      formData.append("email", this.state.email);
      formData.append("firstName", this.state.firstName);
      formData.append("lastName", this.state.lastName);
      formData.append("country", this.state.country);

      this.props.createAccount(formData);
    }
    this.props.history.push("/");
  };

  handleSubmitButtonChange = e => {
    console.log("we are here");
    e.preventDefault();
    if (formValid(this.state)) {
      this.setState({ submitReady: true });
    } else {
      console.log("form not valid yet to submit");
    }
  };

  handleChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    let formErrors = this.state.formErrors;

    switch (name) {
      case "userName":
        formErrors.userName =
          value.length < 3 ? "minimum 3 characters required" : "";
        break;
      case "password":
        formErrors.password =
          value.length < 6 ? "minimum 3 characters required" : "";
        break;
      case "email":
        formErrors.email = emailRegex.test(value)
          ? ""
          : "invalid email address";
        break;
      case "firstName":
        formErrors.firstName =
          value.length < 3 ? "minimum 3 characters required" : "";
        break;
      case "lastName":
        formErrors.lastName =
          value.length < 3 ? "minimum 3 characters required" : "";
        break;
      case "country":
        formErrors.country = value.length < 0 ? "please choose a country" : "";
        break;
      default:
        break;
    }

    this.setState({ formErrors, [name]: value }, () => console.log(this.state));
  };

  render() {
    const { formErrors } = this.state;

    return (
      <div style={{ marginBottom: "50px" }}>
        <Header />
        <div className="container" style={{ marginBottom: 70, marginTop: 70 }}>
          <h1
            style={{ fontSize: "20px", color: "#484848", fontFamily: "Roboto" }}
          >
            {" "}
            Create Account
          </h1>

          <form
            onChange={this.handleSubmitButtonChange}
            onSubmit={this.handleSubmit}
          >
            <label className="profileImageUpload" for="file">
              <div className="box">
                <div style={{ fontSize: 14 }}>
                  Add Photo <Add />
                </div>
              </div>
            </label>

            <input
              id="file"
              name="file"
              type="file"
              onChange={this.handleSelectedFile}
              style={{ color: "#484848" }}
            />
            <br />
            <div className="userName form-Group input">
              <label
                className="form-label"
                style={{ flex: 1 }}
                htmlFor="userName"
              >
                Username:{" "}
              </label>
              <input
                type="text"
                name="userName"
                onChange={this.handleChange}
                className={
                  formErrors.userName.length > 0
                    ? "error form-control"
                    : "form-control"
                }
                style={{ flex: 2 }}
              />
              {formErrors.userName.length > 0 && (
                <span>{formErrors.userName}</span>
              )}
            </div>
            <div className="password input form-Group">
              <label
                className="form-label"
                style={{ flex: 1 }}
                htmlFor="password"
              >
                Password:{" "}
              </label>
              <input
                type="password"
                name="password"
                onChange={this.handleChange}
                className={
                  formErrors.password.length > 0
                    ? "error form-control"
                    : "form-control"
                }
                style={{ flex: 2 }}
              />
              {formErrors.password.length > 0 && (
                <span>{formErrors.password}</span>
              )}
            </div>
            <div className="email input form-Group">
              <label className="form-label" style={{ flex: 1 }} htmlFor="email">
                Email:{" "}
              </label>
              <input
                type="email"
                name="email"
                onChange={this.handleChange}
                className={
                  formErrors.email.length > 0
                    ? "error form-control"
                    : "form-control"
                }
                style={{ flex: 2 }}
              />
              {formErrors.email.length > 0 && <span>{formErrors.email}</span>}
            </div>
            <div className="firstName input form-Group">
              <label
                className="form-label"
                style={{ flex: 1 }}
                htmlFor="firstName"
              >
                First Name:{" "}
              </label>
              <input
                type="text"
                name="firstName"
                onChange={this.handleChange}
                className={
                  formErrors.firstName.length > 0
                    ? "error form-control"
                    : "form-control"
                }
                style={{ flex: 2 }}
              />
              {formErrors.firstName.length > 0 && (
                <span>{formErrors.firstName}</span>
              )}
            </div>
            <div className="lastName input form-Group">
              <label
                className="form-label"
                style={{ flex: 1 }}
                htmlFor="lastName"
              >
                Last Name:{" "}
              </label>
              <input
                type="text"
                name="lastName"
                onChange={this.handleChange}
                className={
                  formErrors.lastName.length > 0
                    ? "form-control"
                    : "form-control"
                }
                style={{ flex: 2 }}
              />
              {formErrors.lastName.length > 0 && (
                <span>{formErrors.lastName}</span>
              )}
            </div>
            <div className="country form-Group input">
              <label
                className="form-label"
                style={{ flex: 1 }}
                htmlFor="country"
              >
                Country:{" "}
              </label>
              <select
                className="custom-select"
                name="country"
                onChange={this.handleChange}
                required
                style={{ flex: 2 }}
                value={this.state.country}
              >
                <option value="Choose Your Country" disabled>
                  Choose Your Country{" "}
                </option>
                {this.props.countries.map(country => (
                  <option key={country._id} value={country.country}>
                    {country.country}
                  </option>
                ))}
              </select>
              {formErrors.country.length > 0 && (
                <span>{formErrors.country}</span>
              )}
            </div>
            <div>
              <input className="form-check-input" required type="checkbox" />
              <label className="form-check-label">
                I agree to MYtinerary's Terms &amp; Conditions
              </label>
            </div>
            <div style={{ marginBottom: "80px", marginTop: "20px" }}>
              {" "}
              {this.state.submitReady ? (
                <button
                  style={{
                    width: "70%",
                    paddingTop: 10,
                    paddingBottom: 10,
                    fontWeight: "bold"
                  }}
                  className="btn btn-primary"
                >
                  OK
                </button>
              ) : (
                <button
                  style={{
                    width: "70%",
                    paddingTop: 10,
                    paddingBottom: 10,
                    fontWeight: "bold"
                  }}
                  className="btn btn-outline-primary"
                >
                  OK
                </button>
              )}
              {/* <button
                className={
                  this.state.submitReady
                    ? "btn btn-primary"
                    : "btn btn-outline-primary"
                }
                style={{ background: this.state.color }}
                type="submit"
              >
                OK
              </button> */}
            </div>
          </form>
        </div>
      </div>
    );
  }
}

SignupPage.propTypes = {
  fetchCountries: PropTypes.func.isRequired,
  createAccount: PropTypes.func.isRequired
  //accounts: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  countries: state.countries.country,
  accounts: state.accounts.account,
  message: state.message.message
});

export default connect(
  mapStateToProps,
  { createAccount, fetchCountries }
)(SignupPage);
