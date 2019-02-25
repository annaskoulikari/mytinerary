import React, { Component } from "react";
import home from "../homeIcon.png";
import "../App.css";
import { NavLink } from "react-router-dom";

import ArrowLeft from "@material-ui/icons/ArrowLeft";
import IconButton from "@material-ui/core/IconButton";

import { createBrowserHistory } from "history";

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
          <div>
            <div>
              {" "}
              <div className="footerBar">
                <NavLink to="/">
                  <img className="footerBarHome" src={home} alt="home logo" />
                </NavLink>
              </div>
            </div>
          </div>
        ) : (
          <div>
            {" "}
            <div className="footerBar">
              <div
                style={{
                  flex: 1,
                  display: "flex",
                  justifyContent: "flexStart"
                }}
              >
                <IconButton
                  onClick={() => {
                    history.goBack();
                  }}
                >
                  <ArrowLeft style={{ fontSize: 50, color: "black" }} />
                </IconButton>
              </div>
              <div
                style={{ flex: 1, display: "flex", justifyContent: "center" }}
              >
                <NavLink to="/">
                  <img className="footerBarHome" src={home} alt="home logo" />
                </NavLink>
              </div>
              <div style={{ flex: 1 }} />
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Footer;
