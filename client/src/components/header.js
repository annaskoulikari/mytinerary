import React, { Component } from "react";

import "../App.css";
import { NavLink } from "react-router-dom";
import AccountCircle from "@material-ui/icons/AccountCircle";

import Menu from "./menu.js";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false
    };
  }

  componentDidMount() {
    let user = localStorage.getItem("user");
    if (user) {
      this.setState({ isLoggedIn: true });
    }
  }

  render() {
    return (
      <div className="headerContainer">
        <div className="header">
          <div className="profile">
            <NavLink to="/profilePage">
              {this.state.isLoggedIn ? (
                <AccountCircle style={{ fontSize: 36, color: "#484848" }} />
              ) : (
                <AccountCircle style={{ fontSize: 36, color: "#D8D8D8" }} />
              )}
            </NavLink>
          </div>
          <div className="menu">
            <Menu />
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
