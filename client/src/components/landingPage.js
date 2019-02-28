import React, { Component } from "react";
import logotest from "../MYtineraryLogo.png";

import "../App.css";
import { NavLink } from "react-router-dom";
import Header from "./header";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import ChevronRight from "@material-ui/icons/ChevronRight";
import { getProfile } from "../actions/profileActions";
import { FormHelperText } from "@material-ui/core";

class LandingPage extends Component {
  componentDidMount() {
    this.props.getProfile();

    let user = localStorage.getItem("user");
    if (user) {
      this.setState({ isLoggedIn: true });
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
            <div className="startBrowsing">
              <p style={{ marginBottom: "none" }}>Start browsing</p>
              <NavLink to="/citiesList">
                <ChevronRight style={{ fontSize: 70, color: "#484848" }} />
              </NavLink>
            </div>

            {this.state.isLoggedIn ? null : (
              <div>
                <p className="signUpText">Want to build your own MYtinerary?</p>
                <div className="signUpOptions">
                  <NavLink
                    to="/loginPage"
                    className="loginOption btn btn-outline-info"
                  >
                    Log in
                  </NavLink>
                  <NavLink
                    to="/signupPage"
                    className="createAccountOption btn btn-outline-info"
                  >
                    Create Account
                  </NavLink>
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
