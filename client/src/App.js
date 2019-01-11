import React, { Component } from "react";
import "./App.css";
import LandingPage from "./components/landingPage";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import CitiesList from "./components/citiesList";
import LoginPage from "./components/loginPage";
import SignupPage from "./components/signupPage";
import MenuOpen from "./components/menuOpen";
import Footer from "./components/footer";
import Itinerary from "./components/itinerary";
import Activity from "./components/activity";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Switch>
            <Route exact path="/" component={LandingPage} />
            <Route path="/activity/:id" component={Activity} />
            <Route path="/itinerary/:city" component={Itinerary} />
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
