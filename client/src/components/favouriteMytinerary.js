import React, { Component } from "react";

import { connect } from "react-redux";
import {
  getFavouriteItinerary,
  removeFavourite,
  getFavourites
} from "../actions/favouriteActions";

import PropTypes from "prop-types";

import { getProfile } from "../actions/profileActions";
import Popup from "reactjs-popup";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Favorite from "@material-ui/icons/Favorite";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";

class FavouriteMytinerary extends Component {
  componentDidMount() {
    this.props.getProfile();
  }

  constructor(props) {
    super(props);
    this.state = {
      open: false,
      liked: false
    };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }
  openModal() {
    this.setState({ open: true, liked: false });
  }
  closeModal() {
    this.setState({ open: false, liked: true });
  }

  removeFromFavourite(id, e) {
    var user = this.props.user;
    this.props.removeFavourite(id, user);
    this.setState({ open: false });
  }

  render() {
    return (
      <div>
        <Card>
          <CardContent>
            <div className="favouriteCard">
              <div className="imageFavourite">
                <img
                  src={this.props.itinerary.itineraryImage}
                  alt="favourite"
                  className="itineraryImage"
                />
              </div>
              <div className="infoFavourite">
                <div className="firstRowFavourite">
                  <div className="titleFavourite">
                    {this.props.itinerary.title}
                  </div>
                  <div className="likeFavourite">
                    {this.state.liked ? (
                      <FavoriteBorder onClick={this.openModal} />
                    ) : (
                      <Favorite onClick={this.openModal} />
                    )}
                  </div>
                </div>
                <div className="secondRowFavourite">
                  <div className="timeFavourite">
                    Time: {this.props.itinerary.hours}
                  </div>
                  <div className="expenseFavourite">
                    Cost: {this.props.itinerary.expense}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Popup
          open={this.state.open}
          closeOnDocumentClick
          onClose={this.closeModal}
        >
          <div className="modal">
            <div>
              Are you sure you want to delete this MYtinerary from your
              Favourites?
            </div>
            <button onClick={this.closeModal}>Cancel</button>
            <button
              onClick={e =>
                this.removeFromFavourite(this.props.itinerary._id, e)
              }
            >
              Confirm
            </button>
          </div>
        </Popup>
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
  user: state.loggedInUserGoogle.loggedInUserGoogle,
  itineraries: state.itineraries.item
});

export default connect(
  mapStateToProps,
  { getFavouriteItinerary, getProfile, removeFavourite, getFavourites }
)(FavouriteMytinerary);
