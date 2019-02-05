import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { checkAccount, googleLogin } from "../actions/loginActions";
import PropTypes from "prop-types";
import axios from "axios";
// import OAuth from "./oauth";
// import io from "socket.io-client";
import queryString from "query-string";

// const socket = io("http://localhost:5000");

// const providers = ["google"];

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleGoogleLogin = this.handleGoogleLogin.bind(this);
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

  handleGoogleLogin(e) {
    e.preventDefault();
    console.log("google login event is a happening");
    // this.props.googleLogin();
    // axios
    //   .get(`http://localhost:5000/auth/google`)
    //   .then(res => {
    //     console.log("done!");
    //     // localStorage.setItem("user", res.data.token);
    //     //console.log(res);
    //   })
    //   .catch(function(error) {
    //     console.log(error);
    //   });

    window.open("http://localhost:5000/auth/google");
  }

  componentWillMount() {
    var query = queryString.parse(this.props.location.search);
    if (query.token) {
      window.localStorage.setItem("user", query.token);
      console.log("you stored the correct token in local storage");
      //this.props.history.push("/");
    }
  }

  render() {
    //console.log(this.props);
    return (
      <React.Fragment>
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
              // className={formErrors.email.length > 0 ? "error" : null}
            />
            {/* {formErrors.email.length > 0 && <span>{formErrors.email}</span>} */}
          </div>

          <div className="password">
            <label htmlFor="password">Password: </label>
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={this.state.value}
              onChange={this.handleChange}
              // className={formErrors.password.length > 0 ? "error" : null}
            />
            {/* {formErrors.password.length > 0 && (
              <span>{formErrors.password}</span>
            )} */}
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
        <button onClick={this.handleGoogleLogin}>Log in with Google</button>
        {/* <a href="http://localhost:5000/auth/google">Log in with Google</a> */}
        <button>Log in with Facebook (version2)</button>
        {/* {providers.map(provider => (
          <OAuth provider={provider} key={provider} socket={socket} />
        ))} */}
        <h4>
          Don't have a MYtinerary account yet? You should create one! It's
          totally free and only takes a minute.
        </h4>
        <NavLink to="/signupPage">Create Account</NavLink>
        {/* {this.props.loggedInUser.message === "Auth succesfull" ? (
          <span>{"Great, you are logged in!"}</span>
        ) : (
          console.log("no one is logged in yet")
        )} */}
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
  { checkAccount, googleLogin }
)(LoginPage);
