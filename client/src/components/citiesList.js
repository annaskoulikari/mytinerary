import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchCities } from "../actions/citiesActions";

import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";

import Header from "./header";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";

import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/Inbox";
import List from "@material-ui/core/List";

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
    const filteredCities = this.props.cities.filter(city => {
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
        <div style={{ marginLeft: 40 }}>
          <div style={{ textAlign: "left", marginBottom: 5 }}>
            Filter our current cities
          </div>
          <Paper style={root} elevation={1}>
            <InputBase style={input} onChange={this.updateSearch.bind(this)} />
          </Paper>
        </div>

        <ul>
          {filteredCities.map(city => (
            <div key={city._id}>
              <NavLink to={"/itinerary/" + city.name}>
                <div>
                  {city.flag} {city.name}
                </div>
              </NavLink>
              <List component="nav">
                <ListItem button>
                  <ListItemIcon>{city.flag}</ListItemIcon>
                  <ListItemText primary={city.name} />
                </ListItem>
              </List>
            </div>
          ))}
        </ul>
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
