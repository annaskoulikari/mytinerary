import React, { Component } from "react";
import logotest from "../mytinerary_logo.png";

import "../App.css";
import { NavLink } from "react-router-dom";
import Header from "./header";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import ChevronRight from "@material-ui/icons/ChevronRight";
import { getProfile } from "../actions/profileActions";

class LandingPage extends Component {
  componentDidMount() {
    let user = localStorage.getItem("user");
    if (user) {
      this.setState({ isLoggedIn: true });
      this.props.getProfile();
    }
  }
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false
    };
  }
  render() {
    return (
      <div
        style={{
          marginBottom: "40px"
        }}
      >
        <Header />
        <div className="container">
          <div className="landingPageContents">
            <div className="logoImage">
              <img className="logo" src={logotest} alt="logo" />
            </div>
            <p className="landingPageText text-center">
              Find your perfect trip, designed by insiders who know and love
              their cities{" "}
            </p>
            <NavLink to="/citiesList">
              <div className="startBrowsingContainer">
                <div className="startBrowsingContents">
                  <div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "flex-start",
                        color: "#ff5b5e"
                      }}
                    >
                      Start Browsing
                    </div>
                    <div style={{ fontSize: 16, fontWeight: "lighter" }}>
                      Explore all the cities
                    </div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <ChevronRight style={{ fontSize: 36 }} />
                  </div>
                </div>
              </div>
            </NavLink>

            {this.state.isLoggedIn ? null : (
              <div>
                <p className="signUpText">Want to build your own MYtinerary?</p>
                <div className="signUpOptions">
                  <div className="loginOptionContainer">
                    <NavLink to="/loginPage">
                      <button
                        style={{
                          backgroundColor: "#ff5b5e",
                          borderColor: "#ff5b5e",
                          width: "75%",
                          paddingTop: 10,
                          paddingBottom: 10,
                          fontWeight: "bold"
                        }}
                        className="btn btn-secondary"
                      >
                        Log in
                      </button>
                    </NavLink>
                  </div>
                  <div className="signupOptionContainer">
                    <NavLink to="/signupPage">
                      <button
                        style={{
                          borderColor: "#ff5b5e",
                          color: "#ff5b5e",
                          width: "75%",
                          paddingTop: 10,
                          paddingBottom: 10,
                          fontWeight: "bold"
                        }}
                        className="btn btn-outline-primary"
                      >
                        Create Account
                      </button>
                    </NavLink>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

LandingPage.propTypes = {
  getProfile: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile.profile
});

export default connect(
  mapStateToProps,
  { getProfile }
)(LandingPage);
