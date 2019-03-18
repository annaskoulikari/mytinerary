import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import {
  checkAccount,
  oauthGoogle,
  oauthFacebook
} from "../actions/loginActions";
import PropTypes from "prop-types";

import GoogleLogin from "react-google-login";

import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import Header from "./header";
import google from "../google_logo.png";
import facebook from "../facebook_logo.png";

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
    this.props.history.push("/");
  }

  async responseGoogle(res) {
    console.log("response google", res);
    await this.props.oauthGoogle(res.accessToken);
    if (!this.props.errorMessage) {
      this.props.history.push("/");
    }
  }

  async responseFacebook(res) {
    console.log("responseFacebook", res);
    await this.props.oauthFacebook(res.accessToken);
    if (!this.props.errorMessage) {
      this.props.history.push("/");
    }
  }

  render() {
    return (
      <React.Fragment>
        <Header />
        <div className="container" style={{ marginTop: 70, marginBottom: 70 }}>
          <p
            style={{ fontSize: "20px", color: "#484848", fontFamily: "Roboto" }}
          >
            Login
          </p>
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
            <div
              className="center"
              style={{
                paddingBottom: 10,
                borderBottom: "1px solid #d8d8d8",
                margin: 6
              }}
            >
              <button
                style={{
                  backgroundColor: "#ff5b5e",
                  borderColor: "#ff5b5e",
                  width: "70%",
                  paddingTop: 10,
                  paddingBottom: 10,
                  fontWeight: "bold"
                }}
                className="btn btn-secondary"
                type="submit "
              >
                Log in
              </button>
            </div>
          </form>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              margin: 6,
              paddingBottom: 10,
              borderBottom: "1px solid #d8d8d8"
            }}
          >
            <div className="googleButton">
              <GoogleLogin
                clientId="71133190926-d8mjt4mslu36qa3md2efuql8md35sjg9.apps.googleusercontent.com"
                render={renderProps => (
                  <button
                    onClick={renderProps.onClick}
                    className="btn btn-primary google "
                  >
                    <div>
                      <img
                        style={{ maxHeight: "25px", marginRight: 10 }}
                        src={google}
                        alt="google"
                      />
                      Log in with Google
                    </div>
                  </button>
                )}
                buttonText="Log in with Google"
                onSuccess={this.responseGoogle}
                onFailure={this.responseGoogle}
              />
            </div>

            <div className="facebookButton">
              <FacebookLogin
                appId="783669185332730"
                callback={this.responseFacebook}
                render={renderProps => (
                  <button
                    className="btn btn-secondary facebook"
                    onClick={renderProps.onClick}
                  >
                    <div>
                      <img
                        style={{ maxHeight: "25px", marginRight: 10 }}
                        src={facebook}
                        alt="facebook"
                      />
                      Log in with Facebook
                    </div>
                  </button>
                )}
              />
            </div>
          </div>
          <p className="text-left roboto" style={{ margin: "20px" }}>
            Don't have a MYtinerary account yet? You should create one! It's
            totally free and only takes a minute.
          </p>
          <div className="createAccountButton">
            <NavLink style={{ width: "100%" }} to="/signupPage">
              <p className="btn btn-outline-primary createAccount">
                Create Account
              </p>
            </NavLink>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

LoginPage.propTypes = {
  checkAccount: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  loggedInUser: state.loggedInUser.loggedInUser
});

export default connect(
  mapStateToProps,
  { checkAccount, oauthGoogle, oauthFacebook }
)(LoginPage);
