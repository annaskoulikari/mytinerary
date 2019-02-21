import React, { Component } from "react";
import Account from "../account.svg";
import "../App.css";
import AccountCircle from "@material-ui/icons/AccountCircle";

class Login extends Component {
  state = {};
  render() {
    return (
      <div>
        {/* <img className="accountLogo" src={Account} alt="account icon" /> */}
        <AccountCircle />
      </div>
    );
  }
}

export default Login;
