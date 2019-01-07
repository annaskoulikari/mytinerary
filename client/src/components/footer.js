import React, { Component } from "react";
import home from "../homeIcon.png";
import "../App.css";

class Footer extends Component {
  state = {};
  render() {
    return (
      <div className="bottomBar">
        <div className="footerBar">
          <img className="footerBarHome" src={home} alt="home logo" />
        </div>
      </div>
    );
  }
}

export default Footer;
