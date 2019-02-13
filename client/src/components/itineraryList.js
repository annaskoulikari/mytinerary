import React, { Component } from "react";
import Itinerary from "./itinerary";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { fetchItineraries } from "../actions/itineraryActions";
import { fetchActivities } from "../actions/activityActions";
import { postComment } from "../actions/commentActions";
import { NavLink } from "react-router-dom";

class ItineraryList extends Component {
  async fetchEverything() {
    let itinerariesArray = [];
    var city = this.props.match.params.city;
    this.props.itineraries.map(itinerary =>
      itinerariesArray.push(itinerary._id)
    );
    console.log(
      "this should be array of itineraries is ItineraryList",
      itinerariesArray
    );
    await this.props.fetchItineraries(city);
    this.props.fetchActivities(itinerariesArray);
    this.props.postComment(itinerariesArray);
  }

  componentDidMount() {
    this.fetchEverything();
  }

  state = {};
  render() {
    return (
      <div>
        <h1>City</h1>
        <h2>Available MYitenaries</h2>
        {this.props.itineraries.map(itinerary => (
          <Itinerary itinerary={itinerary} />
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
  user: state.loggedInUserGoogle.loggedInUserGoogle,
  comment: state.comments.comment
});

export default connect(
  mapStateToProps,
  { fetchItineraries, fetchActivities, postComment }
)(ItineraryList);
