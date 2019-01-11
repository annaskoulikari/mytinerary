import React, { Component } from "react";
import home from "../homeIcon.png";
import "../App.css";
import { NavLink } from "react-router-dom";

class Footer extends Component {
  state = {};
  render() {
    return (
      <div className="bottomBar">
        <div className="footerBar">
          <NavLink to="/">
            <img className="footerBarHome" src={home} alt="home logo" />
          </NavLink>
        </div>
      </div>
    );
  }
}

export default Footer;
