import React, { Component } from "react";
import MenuOpen from "./menuOpen";
import Login from "./login";
import "../App.css";
import { NavLink } from "react-router-dom";

import Menu from "./menu.js";

class Header extends Component {
  componentDidMount() {}
  render() {
    return (
      <React.Fragment>
        <div className="header">
          <div className="loginComponent">
            <NavLink to="/profilePage">
              <Login />
            </NavLink>
          </div>
          <Menu />

          <div />
        </div>
      </React.Fragment>
    );
  }
}

export default Header;
