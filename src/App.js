import React, { Component } from "react";
import "./App.css";
import LandingPageDuplicate from "./components/landingPageDuplicate";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import CitiesPage from "./components/citiesPage";
import LoginPage from "./components/loginPage";
import SignupPage from "./components/signupPage";
import MenuOpen from "./components/menuOpen";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Switch>
            <Route exact path="/" component={LandingPageDuplicate} />
            <Route path="/citiesPage" component={CitiesPage} />
            <Route path="/loginPage" component={LoginPage} />
            <Route path="/signupPage" component={SignupPage} />
            <Route path="/menuOpen" component={MenuOpen} />
            <Route render={() => <h3>Oops no page</h3>} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
