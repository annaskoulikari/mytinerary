import React, { Component } from "react";
import { slide as Menu } from "react-burger-menu";
import { NavLink } from "react-router-dom";

class MenuOpen extends React.Component {
  showSettings(event) {
    event.preventDefault();
  }

  render() {
    return (
      <Menu className="menuStyling">
        <NavLink id="home" className="menu-item menuItemStyling" to="/">
          Home
        </NavLink>
        <NavLink id="about" className="menu-item menuItemStyling" to="/about">
          About
        </NavLink>
        <NavLink
          id="contact"
          className="menu-item menuItemStyling"
          to="/contact"
        >
          Contact
        </NavLink>
        <NavLink
          onClick={this.showSettings}
          className="menu-item--small menuItemStyling"
          to=""
        >
          Settings
        </NavLink>
      </Menu>
    );
  }
}

export default MenuOpen;
