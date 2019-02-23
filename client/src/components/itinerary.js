import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { fetchItineraries } from "../actions/itineraryActions";
import { getProfile } from "../actions/profileActions";

import { NavLink } from "react-router-dom";

import ActivityTrial from "./activity";
import axios from "axios";

import "../App.css";
import {
  getFavourites,
  getFavouriteItinerary,
  removeFavourite
} from "../actions/favouriteActions";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";

import Favorite from "@material-ui/icons/Favorite";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
import Close from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";

class Itinerary extends Component {
  async isLiked() {
    var user = this.props.user.email;
    await this.props.getFavourites(user);

    var favouritesArray = [];
    this.props.favourites.forEach(favourite =>
      favouritesArray.push(favourite._id)
    );

    if (favouritesArray.includes(this.props.itinerary._id)) {
      this.setState({ liked: true });
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      showActivity: false,
      open: false,
      liked: false,
      itineraryAsFavourite: false,
      isLoggedIn: false
    };
    this.openModal = this.openModal.bind(this);

    this.closeModal = this.closeModal.bind(this);
  }

  componentDidMount() {
    let user = localStorage.getItem("user");
    if (user) {
      this.setState({ isLoggedIn: true });
    } else {
      this.setState({ isLoggedIn: false });
    }

    this.props.getProfile();

    this.isLiked();

    if (this.props.useCase === "favourite") {
      this.setState({ itineraryAsFavourite: true });
    } else {
      this.setState({ itineraryAsFavourite: false });
    }
  }
  //use case for itinerarylist
  addToFavourite(itineraryId, e) {
    this.setState({ open: true });
    var itineraryFavourite = itineraryId;
    var user = this.props.user;
    axios
      .post("/testItinerary/itineraries/favourite", {
        itineraryFavourite: itineraryFavourite,
        user: user
      })
      .then(res => {
        console.log(res);
      });
  }

  handleClose = () => {
    this.setState({ open: false, liked: true });
  };

  //use case for favourite
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

  handleToggle(e) {
    e.preventDefault();
    this.setState({
      showActivity: !this.state.showActivity
    });
  }

  render() {
    const style = {
      justifyContent: "center"
    };

    const dialog = {
      textAlign: "center"
    };

    return (
      <div>
        {this.state.itineraryAsFavourite ? (
          <div>
            <Dialog
              open={this.state.open}
              onClose={this.closeModal}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogContent>
                <DialogContentText style={dialog} id="alert-dialog-description">
                  Are you sure you want to delete this MYtinerary from your
                  Favourite?
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button
                  style={{ width: "100%" }}
                  onClick={this.closeModal}
                  color="primary"
                  autoFocus
                >
                  Cancel
                </Button>
                <Button
                  style={{ width: "100%" }}
                  onClick={e =>
                    this.removeFromFavourite(this.props.itinerary._id, e)
                  }
                  color="primary"
                  autoFocus
                >
                  Confirm
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        ) : this.state.isLoggedIn ? (
          <div>
            <Dialog
              open={this.state.open}
              onClose={this.handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogActions>
                <Close onClick={this.handleClose} />
              </DialogActions>
              <DialogContent>
                {this.state.liked ? (
                  <DialogContentText
                    style={dialog}
                    id="alert-dialog-description"
                  >
                    This MYtinerary is already in your favourites! (-:)
                  </DialogContentText>
                ) : (
                  <DialogContentText
                    style={dialog}
                    id="alert-dialog-description"
                  >
                    MYtinerary added to your Favourite
                  </DialogContentText>
                )}
              </DialogContent>
              <DialogActions>
                <Button
                  style={{ width: "100%" }}
                  onClick={this.handleClose}
                  color="primary"
                  autoFocus
                >
                  <NavLink to="/favouritePage">Go to Favourites Page</NavLink>
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        ) : (
          <div>
            <Dialog
              open={this.state.open}
              onClose={this.handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogActions>
                <Close onClick={this.handleClose} />
              </DialogActions>
              <DialogContent>
                <DialogContentText>
                  If you want to unlock the favouriting functionality, please
                  log in!
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button
                  style={{ width: "100%" }}
                  onClick={this.handleClose}
                  color="primary"
                  autoFocus
                >
                  <NavLink to="/">Go to Login</NavLink>
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        )}

        <Card>
          <CardContent>
            <div className="card">
              <div className="horizontal cardContainer">
                <div className="card-content cardImage">
                  <div className="card-image">
                    <img
                      className="responsive-img circle itineraryImage"
                      src={this.props.itinerary.itineraryImage}
                      alt="profile"
                    />
                  </div>
                  <p>{this.props.itinerary.profileName}</p>
                </div>

                <div className="card-content cardInfo">
                  <div className="itineraryHeader">
                    <span className="card-title itineraryTitle">
                      {this.props.itinerary.title}
                    </span>
                    <div>
                      {this.state.itineraryAsFavourite ? (
                        <div className="likeFavourite">
                          {this.state.liked ? (
                            <Favorite onClick={this.openModal} />
                          ) : (
                            <FavoriteBorder onClick={this.openModal} />
                          )}
                        </div>
                      ) : !this.state.isLoggedIn ? (
                        <IconButton color="disabled" onClick={this.openModal}>
                          <Favorite />
                        </IconButton>
                      ) : (
                        <div
                          onClick={e =>
                            this.addToFavourite(this.props.itinerary._id, e)
                          }
                          className="btn-floating pink itineraryLike"
                        >
                          {this.state.liked ? <Favorite /> : <FavoriteBorder />}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="itineraryInfo">
                    <div className="itineraryLikes">
                      Likes: {this.props.itinerary.likes}
                    </div>
                    <div className="itineraryHours">
                      {this.props.itinerary.hours} Hours
                    </div>
                    <div className="itineraryExpense">
                      {this.props.itinerary.expense}
                    </div>
                  </div>
                  <div className="itineraryHashtags">
                    {this.props.itinerary.hashtags.map(hashtag => (
                      <div className="itineraryHashtag">{hashtag}</div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            {this.state.showActivity ? (
              <ActivityTrial property={this.props.itinerary._id} />
            ) : null}
          </CardContent>
          <CardActions style={style}>
            <div className="cardAction">
              <button
                id={this.props.itinerary._id}
                onClick={e => this.handleToggle(e)}
              >
                {this.state.showActivity ? "Close" : "View All"}
              </button>
            </div>
          </CardActions>
        </Card>
      </div>
    );
  }
}

Itinerary.propTypes = {
  fetchItineraries: PropTypes.func.isRequired,
  itineraries: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  itineraries: state.itineraries.item,
  user: state.profile.profile,
  favourites: state.favourites.favourites
});

export default connect(
  mapStateToProps,
  {
    fetchItineraries,
    getProfile,
    getFavourites,
    getFavouriteItinerary,
    removeFavourite
  }
)(Itinerary);
