import React, { Component } from "react";
import FavouriteMytinerary from "./favouriteMytinerary";

import { connect } from "react-redux";
import {
  getFavourites,
  getFavouriteItinerary
} from "../actions/favouriteActions";
import { getProfile } from "../actions/profileActions";
import PropTypes from "prop-types";

class Favourite extends Component {
  componentDidMount() {
    this.props.getProfile();
    var user = this.props.profile.email;
    console.log(user);
    this.props.getFavourites(user);
  }

  // handleItineraries = (favouritesArray, e) => {
  //   favouritesArray = this.props.favourites;
  //   console.log("this should be this.props.favourites", this.props.favourites);
  //   console.log("this should be the favourites array", favouritesArray);
  //   this.props.getFavouriteItinerary(favouritesArray);
  //   console.log("this should be this.props", this.props);
  // };

  state = {};
  render() {
    return (
      <div>
        <h1>Favourites</h1>
        {/* <button onClick={e => this.handleItineraries(this.props.favourites, e)}>
          clickme
        </button> */}

        {/* {this.props.favourites.map(favourite => (
          <FavouriteMytinerary itinerary={favourite} />
        ))} */}

        {this.props.favourites.length !== 0 ? (
          this.props.favourites.map(favourite => (
            <FavouriteMytinerary itinerary={favourite} />
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
  { getProfile, getFavourites, getFavouriteItinerary }
)(Favourite);
