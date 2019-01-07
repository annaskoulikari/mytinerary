import React, { Component } from "react";
import MenuOpen from "./menuOpen";
import Login from "./login";
import "../App.css";

class Header extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <div className="header">
          <div className="loginComponent">
            <Login />
          </div>

          <MenuOpen />
        </div>
      </React.Fragment>
    );
  }
}

export default Header;
