import React, { Component } from "react";
import HamburgerIcon from "../hamburgerIcon.png";
import "../App.css";
import { NavLink } from "react-router-dom";

class Hamburger extends Component {
  state = {};
  render() {
    return (
      <div>
        <NavLink to="/menuOpen">
          <img
            className="hamburgerIcon"
            src={HamburgerIcon}
            alt="hamburger icon"
          />
        </NavLink>
      </div>
    );
  }
}

export default Hamburger;
