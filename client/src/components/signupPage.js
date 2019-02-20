import React, { Component } from "react";
import "../App.css";
import { connect } from "react-redux";
import { createAccount } from "../actions/accountActions";
import { fetchCountries } from "../actions/countryActions";
import PropTypes from "prop-types";
import Header from "./header";
import axios from "axios";

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
      selectedFile: null,
      submitReady: false,
      userName: null,
      password: null,
      email: null,
      firstName: null,
      lastName: null,
      country: null,
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
    // this.handleSubmitFile = this.handleSubmitFile.bind(this);
    // this.fileInput = React.createRef();
  }

  componentDidMount() {
    this.props.fetchCountries();
    console.log(this.props.countries);
    console.log(this.props);
  }

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
      const userName = this.state.userName;
      const password = this.state.password;
      const email = this.state.email;
      const firstName = this.state.firstName;
      const lastName = this.state.lastName;
      const country = this.state.country;
      this.props.createAccount(
        userName,
        password,
        email,
        firstName,
        lastName,
        country
      );
    }
    // console.log(this.props.message);
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

    // formValid(this.state)
    //   ? this.setState({ color: "green" })
    //   : this.setState({ color: "grey" });
  };

  // fileSelectedHandler = event => {
  //   console.log(event.target.files[0]);
  // };

  // profileSubmit = e => {
  //   axios.post("/upload", upload.single("file"), (req, res) => {
  //     res.json({ file: req.file });
  //   });
  // }

  // handleSubmitFile = event => {
  //   event.preventDefault();
  //   var file = event.target.files[0];
  //   console.log("this is file", file);

  //   // axios
  //   //   .post("/uploads", { file: file })
  //   //   .then(res => console.log("this should be file res", res));
  // };

  handleSelectedFile = event => {
    console.log("selectedfile", event.target.files[0]);
    this.setState({ selectedFile: event.target.files[0] });
  };

  handleUpload = () => {
    const data = new FormData();
    data.append("file", this.state.selectedFile, this.state.selectedFile.name);
    axios
      .post("https://localhost:5000/uploads", data)
      .then(res => console.log("this is after uploading file res", res));
  };

  render() {
    const { formErrors } = this.state;

    return (
      <div>
        <Header />
        <h1> Create Account</h1>

        <form>
          <label>
            Upload file:
            <input
              type="file"
              ref={this.fileInput}
              onChange={this.handleSelectedFile}
            />
          </label>
          <br />
          <button onClick={this.handleUpload}>Submit</button>
        </form>

        <form
          onChange={this.handleSubmitButtonChange}
          onSubmit={this.handleSubmit}
        >
          {/* <div>
            <label>Profile Photo:</label>
            <input
              type="file"
              name="file"
              id="file"
              class="custom-file-input"
              onChange={this.fileSelectedHandler}
            />
          </div> */}

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
                formErrors.lastName.length > 0 ? "form-control" : "form-control"
              }
              style={{ flex: 2 }}
            />
            {formErrors.lastName.length > 0 && (
              <span>{formErrors.lastName}</span>
            )}
          </div>
          <div className="country form-Group input">
            <label className="form-label" style={{ flex: 1 }} htmlFor="country">
              Country:{" "}
            </label>
            <select
              className="custom-select"
              name="country"
              onChange={this.handleChange}
              required
              style={{ flex: 2 }}
            >
              <option value="" disabled selected>
                Choose your Country{" "}
              </option>
              {this.props.countries.map(country => (
                <option key={country._id} value={country.country}>
                  {country.country}
                </option>
              ))}
            </select>
            {formErrors.country.length > 0 && <span>{formErrors.country}</span>}
          </div>
          <div>
            <input className="form-check-input" required type="checkbox" />
            <label className="form-check-label">
              I agree to MYtinerary's Terms &amp; Conditions
            </label>
          </div>
          <div style={{ margin: "30px" }}>
            <button
              className={
                this.state.submitReady
                  ? "btn btn-primary"
                  : "btn btn-outline-primary"
              }
              style={{ background: this.state.color }}
              type="submit"
            >
              OK
            </button>
          </div>
        </form>
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
