import React, { Component } from "react";
import CitiesList from "./citiesList";

class CitiesPage extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <div className="container">
          <p>This is the Cities Page</p>
          <CitiesList />
        </div>
      </React.Fragment>
    );
  }
}

export default CitiesPage;
