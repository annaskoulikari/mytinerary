import React, { Component } from "react";

import { connect } from "react-redux";
import {
  getFavouriteItinerary,
  removeFavourite,
  getFavourites
} from "../actions/favouriteActions";

import PropTypes from "prop-types";
import favourited from "../images/favourited.png";
import favourite from "../images/favourite.png";

import { getProfile } from "../actions/profileActions";
import Popup from "reactjs-popup";
import close from "../images/close.png";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Favorite from "@material-ui/icons/Favorite";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";

class FavouriteMytinerary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      image: favourited,
      liked: false,
      imageClose: close
    };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }
  openModal() {
    this.setState({ open: true });
    this.setState({ image: favourite, liked: false });
  }
  closeModal() {
    this.setState({ open: false, image: favourited, liked: true });
  }

  componentDidMount() {
    console.log(this.props);
    console.log(this.props.itinerary);
    this.props.getProfile();
  }

  removeFromFavourite(id, e) {
    console.log("yup let's remove");
    console.log(id);
    this.setState({ image: favourite, liked: false });
    var user = this.props.user;
    console.log("this should be the user accessing from front end", user);
    this.props.removeFavourite(id, user);
    this.setState({ open: false });
  }

  render() {
    const cover = {
      width: 151
    };
    return (
      <div>
        {/* {this.props.itineraries.map(itinerary => (
          <div>
            <img src={itinerary.itineraryImage} alt="itinerary" />
          </div>
        ))} */}
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
        {/* <h2>here I should put mytinerary</h2>
        {this.props.itinerary.profileName}
        <div> */}
        {/* <div>
            <img
              onClick={this.openModal}
              className="itineraryHeart"
              src={this.state.image}
              alt="like"
            /> */}
        {/* <Popup
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
            </Popup> */}
        {/* </div> */}
        {/* </div> */}
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
