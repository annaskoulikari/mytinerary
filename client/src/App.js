import "bootstrap/dist/css/bootstrap.min.css";
import $ from "jquery";
import Popper from "popper.js";
import "bootstrap/dist/js/bootstrap.bundle.min";
import React, { Component } from "react";
import "./App.css";
import LandingPage from "./components/landingPage";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import CitiesList from "./components/citiesList";
import LoginPage from "./components/loginPage";
import SignupPage from "./components/signupPage";
import MenuOpen from "./components/menuOpen";
import Footer from "./components/footer";
import ProfilePage from "./components/profilePage";
import Favourite from "./components/favourite";
import ItineraryList from "./components/itineraryList";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faIgloo } from "@fortawesome/free-solid-svg-icons";

library.add(faIgloo);

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Switch>
            <Route exact path="/" component={LandingPage} />
            <Route path="/favouritePage" component={Favourite} />
            <Route exact path="/profilePage" component={ProfilePage} />
            <Route path="/itinerary/:city" component={ItineraryList} />
            <Route path="/citiesList" component={CitiesList} />
            <Route path="/loginPage" component={LoginPage} />
            <Route path="/signupPage" component={SignupPage} />
            <Route path="/menuOpen" component={MenuOpen} />
            <Route render={() => <h3>Oops no page</h3>} />
          </Switch>
          <Footer />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
