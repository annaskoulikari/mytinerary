import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchCities } from "../actions/citiesActions";

import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";

import Header from "./header";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";

class CitiesList extends Component {
  componentDidMount() {
    this.props.fetchCities();
  }

  constructor() {
    super();
    this.state = {
      search: ""
    };
  }

  updateSearch(event) {
    this.setState({ search: event.target.value.substr(0, 20) });
  }

  render() {
    const citiesAlphabetical = this.props.cities.sort(function(a, b) {
      var textA = a.name.toLowerCase();
      var textB = b.name.toLowerCase();
      return textA < textB ? -1 : textA > textB ? 1 : 0;
    });
    console.log("citiesAlphabetical", citiesAlphabetical);

    const filteredCities = citiesAlphabetical.filter(city => {
      return (
        city.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1
      );
    });

    const root = {
      padding: "2px 4px",
      display: "flex",
      alignItems: "center",
      width: 300,
      justifyContent: "center",
      margin: 0
    };
    const input = {
      flex: 1,
      margin: 0
    };

    return (
      <div>
        <Header />
        <div style={{ marginLeft: 40, marginBottom: 30 }}>
          <div style={{ textAlign: "left", marginBottom: 5 }}>
            Filter our current cities
          </div>
          <Paper style={root} elevation={1}>
            <InputBase style={input} onChange={this.updateSearch.bind(this)} />
          </Paper>
        </div>
        <div className="cityList">
          <div className="list-group ">
            {filteredCities.map(city => (
              <div
                className="list-group-item list-group-item-action"
                key={city._id}
              >
                <NavLink to={"/itinerary/" + city.name}>
                  <div style={{ display: "flex", paddingLeft: "30px" }}>
                    <div style={{ fontSize: "30px" }}>{city.flag}</div>
                    <div
                      style={{
                        fontSize: "30px",
                        paddingLeft: "30px",
                        color: "black"
                      }}
                    >
                      {" "}
                      {city.name}
                    </div>
                  </div>
                </NavLink>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

CitiesList.propTypes = {
  fetchCities: PropTypes.func.isRequired,
  cities: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  cities: state.cities.items
});

export default connect(
  mapStateToProps,
  { fetchCities }
)(CitiesList);
