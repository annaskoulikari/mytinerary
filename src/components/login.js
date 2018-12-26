import React, { Component } from "react";
import Account from "../account.svg";
import "../App.css";

class Login extends Component {
  state = {};
  render() {
    return (
      <div>
        <img className="accountLogo" src={Account} alt="account icon" />
      </div>
    );
  }
}

export default Login;
