import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import {
  checkAccount,
  googleLogin,
  oauthGoogle,
  oauthFacebook
} from "../actions/loginActions";
import PropTypes from "prop-types";

import GoogleLogin from "react-google-login";
import FacebookLogin from "react-facebook-login";
import Header from "./header";

//import queryString from "query-string";

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      accessToken: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.responseGoogle = this.responseGoogle.bind(this);
    this.responseFacebook = this.responseFacebook.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log(this.state);
    const email = this.state.email;
    const password = this.state.password;
    this.props.checkAccount(email, password);
  }

  componentWillMount() {}

  async responseGoogle(res) {
    console.log("response google", res);
    await this.props.oauthGoogle(res.accessToken);
    if (!this.props.errorMessage) {
      this.props.history.push("/profilePage");
    }
  }

  async responseFacebook(res) {
    console.log("responseFacebook", res);
    await this.props.oauthFacebook(res.accessToken);
    if (!this.props.errorMessage) {
      this.props.history.push("/profilePage");
    }
  }

  render() {
    return (
      <React.Fragment>
        <Header />
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="input formGroup ">
            <label className="form-label" htmlFor="email" style={{ flex: 1 }}>
              Email:
            </label>
            <input
              type="email"
              name="email"
              onChange={this.handleChange}
              value={this.state.value}
              className="form-control"
              style={{ flex: 2 }}
            />
          </div>

          <div className="password formGroup">
            <label
              className="form-label"
              htmlFor="password"
              style={{ flex: 1 }}
            >
              Password:
            </label>
            <input
              type="password"
              name="password"
              value={this.state.value}
              onChange={this.handleChange}
              className="form-control"
              style={{ flex: 2 }}
            />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-start",
              margin: "10px",
              alignItems: "center"
            }}
          >
            <div className="form-check">
              <input type="checkbox" className="form-check-input" />
              <label className="form-check-label">Remember Me</label>
            </div>
          </div>
          <div>
            <button className="btn btn-outline-primary" type="submit ">
              OK
            </button>
          </div>
        </form>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
          }}
        >
          <div className="facebookButton">
            <FacebookLogin
              appId="783669185332730"
              // autoLoad={true}
              textButton="Log in with Facebook"
              // field="name, email, picture"
              callback={this.responseFacebook}
              // cssClass="btn btn-primary "
            />
          </div>
          <div className="googleButton">
            <GoogleLogin
              clientId="71133190926-d8mjt4mslu36qa3md2efuql8md35sjg9.apps.googleusercontent.com"
              buttonText="Log in with Google"
              onSuccess={this.responseGoogle}
              onFailure={this.responseGoogle}
              className="btn "
            />
          </div>
        </div>
        <p className="text-left" style={{ margin: "20px" }}>
          Don't have a MYtinerary account yet? You should create one! It's
          totally free and only takes a minute.
        </p>
        <NavLink to="/signupPage">Create Account</NavLink>
      </React.Fragment>
    );
  }
}

LoginPage.propTypes = {
  checkAccount: PropTypes.func.isRequired
  //loggedInUser: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  loggedInUser: state.loggedInUser.loggedInUser
});

export default connect(
  mapStateToProps,
  { checkAccount, googleLogin, oauthGoogle, oauthFacebook }
)(LoginPage);
