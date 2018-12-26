import React, { Component } from "react";
import logotest from "../MYtineraryLogo.png";
import cities from "../circled-right-2.png";
import "../App.css";
import { NavLink } from "react-router-dom";
import Header from "./header";

class LangingPage extends Component {
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
            <NavLink to="/citiesPage">
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
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default LangingPage;
