import React, { Component } from "react";

import "../App.css";
import { NavLink } from "react-router-dom";

import ArrowLeft from "@material-ui/icons/ArrowLeft";
import IconButton from "@material-ui/core/IconButton";

import { createBrowserHistory } from "history";

import HomeIcon from "@material-ui/icons/Home";

class Footer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      homePage: false
    };
  }

  render() {
    const history = createBrowserHistory();
    return (
      <div className="bottomBar">
        {history.location.pathname === "/" ? (
          <div className="footerBar">
            <NavLink activeClassName="active" className="inactive" to="/">
              <div>
                <HomeIcon style={{ fontSize: 36, color: "#484848" }} />
              </div>
            </NavLink>
          </div>
        ) : (
          <div className="footerBar">
            <div
              style={{
                flex: 1,
                display: "flex",
                justifyContent: "flexStart"
              }}
            >
              <IconButton
                style={{ padding: 5 }}
                onClick={() => {
                  history.goBack();
                }}
              >
                <ArrowLeft style={{ fontSize: 50, color: "#484848" }} />
              </IconButton>
            </div>
            <div style={{ flex: 1, display: "flex", justifyContent: "center" }}>
              <NavLink activeClassName="active" className="inactive" to="/">
                <HomeIcon style={{ fontSize: 36, color: "#484848" }} />
              </NavLink>
            </div>
            <div style={{ flex: 1 }} />
          </div>
        )}
      </div>
    );
  }
}

export default Footer;
