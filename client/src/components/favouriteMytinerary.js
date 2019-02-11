import React, { Component } from "react";

import { connect } from "react-redux";
import { getFavouriteItinerary } from "../actions/favouriteActions";

import PropTypes from "prop-types";
import favourite from "../images/favourited.png";
import axios from "axios";
import { getProfile } from "../actions/profileActions";

class FavouriteMytinerary extends Component {
  componentDidMount() {
    console.log(this.props.itinerary);
    this.props.getProfile();
  }

  removeFromFavourite(id, e) {
    console.log("yup let's remove");
    console.log(id);
    var user = this.props.user;
    console.log("this should be the user accessing from front end", user);
    axios
      .post("/favourite/deleteFavourite", { id: id, user: user })
      .then(res => {
        console.log(res);
      });
  }

  state = { image: favourite };
  render() {
    return (
      <div>
        <h2>here I should put mytinerary</h2>
        {this.props.itinerary.profileName}
        <div>
          <img
            onClick={e => this.removeFromFavourite(this.props.itinerary._id, e)}
            className="itineraryHeart"
            src={this.state.image}
            alt="like"
          />
        </div>
      </div>
    );
  }
}

FavouriteMytinerary.propTypes = {
  getFavouriteItinerary: PropTypes.func.isRequired,
  favouriteItinerary: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  favouriteItinerary: state.favouriteItinerary.favouriteItinerary,
  user: state.loggedInUserGoogle.loggedInUserGoogle
});

export default connect(
  mapStateToProps,
  { getFavouriteItinerary, getProfile }
)(FavouriteMytinerary);
