import React, { Component } from "react";
import FavouriteMytinerary from "./favouriteMytinerary";

import { connect } from "react-redux";
import {
  getFavourites,
  getFavouriteItinerary
} from "../actions/favouriteActions";
import { getProfile } from "../actions/profileActions";
import PropTypes from "prop-types";
import Header from "./header";
import Itinerary from "./itinerary";
import { fetchActivities } from "../actions/activityActions";
import { postComment } from "../actions/commentActions";

class Favourite extends Component {
  // componentDidMount() {
  //   this.props.getProfile();
  //   var user = this.props.profile.email;
  //   console.log(user);
  //   this.props.getFavourites(user);
  // }

  async fetchEverything() {
    let itinerariesArray = [];
    this.props.getProfile();
    var user = this.props.profile.email;
    console.log(user);
    await this.props.getFavourites(user);

    this.props.favourites.map(itinerary =>
      itinerariesArray.push(itinerary._id)
    );
    console.log(
      "this should be array of itineraries is ItineraryList",
      itinerariesArray
    );

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
        <Header />
        <h1>Favourites</h1>

        {this.props.favourites.length !== 0 ? (
          this.props.favourites.map(favourite => (
            <Itinerary useCase="favourite" itinerary={favourite} />
          ))
        ) : (
          <div>You have no favourites</div>
        )}
      </div>
    );
  }
}

Favourite.propTypes = {
  getFavourites: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  favouriteItinerary: state.favouriteItinerary.favouriteItinerary,
  favourites: state.favourites.favourites,
  profile: state.profile.profile
});

export default connect(
  mapStateToProps,
  {
    getProfile,
    getFavourites,
    getFavouriteItinerary,
    fetchActivities,
    postComment
  }
)(Favourite);
