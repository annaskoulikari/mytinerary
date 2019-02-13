import React, { Component } from "react";
import MenuOpen from "./menuOpen";
import Login from "./login";
import "../App.css";
import { NavLink } from "react-router-dom";

class Header extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <div className="header">
          <div className="loginComponent">
            <NavLink to="/profilePage">
              <Login />
            </NavLink>
          </div>

          {/* <MenuOpen /> */}
        </div>
      </React.Fragment>
    );
  }
}

export default Header;
