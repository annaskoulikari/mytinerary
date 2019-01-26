import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { checkAccount } from "../actions/loginActions";
import PropTypes from "prop-types";

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
        <button>Log in with Google</button>
        <button>Log in with Facebook</button>
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
  { checkAccount }
)(LoginPage);
