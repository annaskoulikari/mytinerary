import React, { Component } from "react";
import MenuOpen from "./menuOpen";
import Login from "./login";
import "../App.css";
import { NavLink } from "react-router-dom";
import logout from "../images/logout.png";

import Menu from "./menu.js";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logoutImage: logout,
      isLoggedIn: false
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    window.localStorage.removeItem("user");
    this.setState({ isLoggedIn: false });
  }

  componentDidMount() {
    if (localStorage.getItem("user") != null) {
      this.setState({ isLoggedIn: true });
    }
  }
  render() {
    return (
      <React.Fragment>
        <div className="header">
          <div className="loginComponent">
            <NavLink to="/profilePage">
              <Login />
            </NavLink>
            {this.state.isLoggedIn ? (
              <img
                className="image"
                src={this.state.logoutImage}
                alt="logout"
                onClick={e => this.handleClick(e)}
              />
            ) : null}
          </div>
          <Menu />

          <div />
        </div>
      </React.Fragment>
    );
  }
}

export default Header;
