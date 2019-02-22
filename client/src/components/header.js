import React, { Component } from "react";

import "../App.css";
import { NavLink } from "react-router-dom";
import AccountCircle from "@material-ui/icons/AccountCircle";
import IconButton from "@material-ui/core/IconButton";

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
    const style = {
      width: 96,
      height: 96
    };

    return (
      <React.Fragment>
        <div className="header">
          <div className="profile">
            <NavLink to="/profilePage">
              {this.state.isLoggedIn ? (
                <IconButton style={style}>
                  <AccountCircle />
                </IconButton>
              ) : (
                <IconButton style={style} disabled={true}>
                  <AccountCircle />
                </IconButton>
              )}
            </NavLink>
          </div>
          <div className="menu">
            <Menu />
          </div>
          <div />
        </div>
      </React.Fragment>
    );
  }
}

export default Header;
