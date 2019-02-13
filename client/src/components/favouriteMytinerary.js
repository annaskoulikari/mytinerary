import React, { Component } from "react";

import { connect } from "react-redux";
import {
  getFavouriteItinerary,
  removeFavourite
} from "../actions/favouriteActions";

import PropTypes from "prop-types";
import favourited from "../images/favourited.png";
import favourite from "../images/favourite.png";

import { getProfile } from "../actions/profileActions";
import Popup from "reactjs-popup";
import close from "../images/close.png";

class FavouriteMytinerary extends Component {
  constructor(props) {
    super(props);
    this.state = { open: false, image: favourited, imageClose: close };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }
  openModal() {
    this.setState({ open: true });
    this.setState({ image: favourite });
  }
  closeModal() {
    this.setState({ open: false, image: favourited });
  }

  componentDidMount() {
    console.log(this.props.itinerary);
    this.props.getProfile();
  }

  removeFromFavourite(id, e) {
    console.log("yup let's remove");
    console.log(id);
    this.setState({ image: favourite });
    var user = this.props.user;
    console.log("this should be the user accessing from front end", user);
    this.props.removeFavourite(id, user);
    this.setState({ open: false });
  }

  render() {
    return (
      <div>
        <h2>here I should put mytinerary</h2>
        {this.props.itinerary.profileName}
        <div>
          <div>
            <img
              onClick={this.openModal}
              className="itineraryHeart"
              src={this.state.image}
              alt="like"
            />
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
  { getFavouriteItinerary, getProfile, removeFavourite }
)(FavouriteMytinerary);
