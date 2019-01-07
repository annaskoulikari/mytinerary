import React, { Component } from "react";
import CitiesList from "./citiesList";

class CitiesPage extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <p>This is the Cities Page</p>
        <CitiesList />
      </React.Fragment>
    );
  }
}

export default CitiesPage;
