import React, { Component } from "react";
import Itinerary1 from "./itinerary1";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { fetchItineraries } from "../actions/itineraryActions";
import { fetchActivities } from "../actions/activityActions";
import { NavLink } from "react-router-dom";

class ItineraryList extends Component {
  componentDidMount() {
    var city = this.props.match.params.city;
    this.props.fetchItineraries(city);
    console.log(this.props);
    console.log(this.props.match.params.city);
    console.log(this.state);
    console.log("is this itineraries", this.props.itineraries);
  }

  state = {};
  render() {
    let itinerariesArray = [];
    this.props.itineraries.map(itinerary =>
      itinerariesArray.push(itinerary._id)
    );
    console.log(
      "this should be array of itineraries is ItineraryList",
      itinerariesArray
    );
    this.props.fetchActivities(itinerariesArray);

    return (
      <div>
        <h1>City</h1>
        <h2>Available MYitenaries</h2>
        {this.props.itineraries.map(itinerary => (
          <Itinerary1 itinerary={itinerary} />
        ))}
        <NavLink to="/citiesList">Choose Another City</NavLink>
      </div>
    );
  }
}

ItineraryList.propTypes = {
  fetchItineraries: PropTypes.func.isRequired,
  itineraries: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  itineraries: state.itineraries.item,
  user: state.loggedInUserGoogle.loggedInUserGoogle
});

export default connect(
  mapStateToProps,
  { fetchItineraries, fetchActivities }
)(ItineraryList);
