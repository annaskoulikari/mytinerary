import React, { Component } from "react";
import logotest from "../MYtineraryLogo.png";
import cities from "../circled-right-2.png";
import "../App.css";
import { NavLink } from "react-router-dom";
import Header from "./header";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { getProfile } from "../actions/profileActions";

class LandingPage extends Component {
  componentDidMount() {
    this.props.getProfile();
  }
  state = {};
  render() {
    return (
      <React.Fragment>
        <Header />
        <div className="row landingPageContents">
          <img className="logo" src={logotest} alt="logo" />
          <p className="landingPageText">
            Find your perfect trip, designed by insiders who know and love thier
            cities
          </p>
          <div className="startBrowsing">
            <p>Start browsing</p>
            <NavLink to="/citiesList">
              <img
                className="citiesArrow"
                src={cities}
                alt="arrow pointing to the right"
              />
            </NavLink>
          </div>
          <div>
            <p className="signUpText">Want to build your own MYtinerary?</p>
            <div className="signUpOptions">
              <NavLink to="/loginPage" className="loginOption">
                Log in
              </NavLink>
              <NavLink to="/signupPage" className="createAccountOption">
                Create Account
              </NavLink>
              <NavLink to="/favouritePage"> Favourite </NavLink>;
            </div>
          </div>
        </div>
      </React.Fragment>
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
