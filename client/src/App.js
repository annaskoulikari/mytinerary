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
