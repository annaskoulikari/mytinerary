import React, { Component } from "react";
import logotest from "../MYtineraryLogo.png";
import cities from "../circled-right-2.png";
import "../App.css";
import { NavLink } from "react-router-dom";
import Header from "./header";
import Slider from "react-animated-slider";
import "react-animated-slider/build/horizontal.css";
import Amsterdam from "../amsterdam.jpg";
import Athens from "../athens.jpg";
import Prague from "../prague.jpg";
import Berlin from "../berlin.jpg";
import Copenhagen from "../copenhagen.jpg";
import Rotterdam from "../rotterdam.jpg";
import Denhaag from "../denhaag.jpg";
import Porto from "../porto.jpg";
import Rome from "../rome.jpg";
import Stuttgart from "../stuttgart.jpg";
import Hamburg from "../hamburg.jpg";
import Thessaloniki from "../thessaloniki.jpg";

class LangingPageDuplicate extends Component {
  state = {
    content: [
      {
        img1: Amsterdam,
        img2: Athens,
        img3: Berlin,
        img4: Prague
      },
      {
        img1: Copenhagen,
        img2: Rotterdam,
        img3: Denhaag,
        img4: Porto
      },

      {
        img1: Rome,
        img2: Stuttgart,
        img3: Hamburg,
        img4: Thessaloniki
      }
    ]
  };
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
            <NavLink to="/citiesPage">
              <img
                className="citiesArrow"
                src={cities}
                alt="arrow pointing to the right"
              />
            </NavLink>
          </div>
          <Slider>
            {this.state.content.map((article, index) => (
              <div key={index}>
                <div className="imageRow">
                  <div className="sliderImageContainer">
                    <img className="sliderImage" src={article.img1} />
                  </div>
                  <div className="sliderImageContainer">
                    <img className="sliderImage" src={article.img2} />
                  </div>
                </div>
                <div className="imageRow">
                  <div className="sliderImageContainer">
                    <img className="sliderImage" src={article.img3} />
                  </div>
                  <div className="sliderImageContainer">
                    <img className="sliderImage" src={article.img4} />
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </React.Fragment>
    );
  }
}

export default LangingPageDuplicate;
