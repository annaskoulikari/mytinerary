import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import {
  checkAccount,
  googleLogin,
  oauthGoogle
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
          <div className="email">
            <label htmlFor="email">Email: </label>
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={this.handleChange}
              value={this.state.value}
            />
          </div>

          <div className="password">
            <label htmlFor="password">Password: </label>
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={this.state.value}
              onChange={this.handleChange}
            />
          </div>
          <div>
            <input required type="checkbox" />
            <label>Remember Me</label>
          </div>
          <div>
            <button style={{ background: this.state.color }} type="submit">
              OK
            </button>
          </div>
        </form>
        <FacebookLogin
          appId="783669185332730"
          // autoLoad={true}
          textButton="Facebook"
          field="name, email, picture"
          callback={this.responseFacebook}
          cssClass=""
        />

        <GoogleLogin
          clientId="71133190926-d8mjt4mslu36qa3md2efuql8md35sjg9.apps.googleusercontent.com"
          buttonText="Google"
          onSuccess={this.responseGoogle}
          onFailure={this.responseGoogle}
        />
        <button>Log in with Facebook (version2)</button>

        <h4>
          Don't have a MYtinerary account yet? You should create one! It's
          totally free and only takes a minute.
        </h4>
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
  { checkAccount, googleLogin, oauthGoogle }
)(LoginPage);
