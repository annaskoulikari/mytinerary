import React, { Component } from "react";
import home from "../homeIcon.png";
import "../App.css";
import { NavLink, Link } from "react-router-dom";

import ArrowLeft from "@material-ui/icons/ArrowLeft";
import IconButton from "@material-ui/core/IconButton";

import { createBrowserHistory } from "history";

import HomeIcon from "@material-ui/icons/Home";
import SvgIcon from "@material-ui/core/SvgIcon";

class Footer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      homePage: false
    };
  }

  render() {
    // function HomeIcon(props) {
    //   return (
    //     <SvgIcon {...props}>
    //       <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    //     </SvgIcon>
    //   );
    // }
    const history = createBrowserHistory();
    return (
      <div className="bottomBar">
        {history.location.pathname === "/" ? (
          <div className="footerBar">
            <NavLink activeClassName="active" className="inactive" to="/">
              <div>
                <HomeIcon style={{ fontSize: 36, color: "#484848" }} />
              </div>
              {/* <img className="footerBarHome" src={home} alt="home logo" /> */}
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
