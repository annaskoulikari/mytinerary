import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { fetchItineraries } from "../actions/itineraryActions";
import { getProfile } from "../actions/profileActions";

import { NavLink } from "react-router-dom";

import ActivityTrial from "./activity";

import "../App.css";
import {
  getFavourites,
  removeFavourite,
  addToFavourites
} from "../actions/favouriteActions";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";

import ThumbUp from "@material-ui/icons/ThumbUp";
import AccessTime from "@material-ui/icons/AccessTime";

import Down from "@material-ui/icons/KeyboardArrowDown";
import Up from "@material-ui/icons/KeyboardArrowUp";
import Favorite from "@material-ui/icons/Favorite";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
import Close from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";

class Itinerary extends Component {
  async isLiked() {
    // var user = this.props.user.email;
    // await this.props.getFavourites(user);

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

    // this.props.getProfile();

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
    // var user = this.props.user;
    // var user = this.props.user[0];

    var user = this.props.profile[0];
    console.log("this should be user", user);
    this.props.addToFavourites(itineraryFavourite, user);
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
    var user = this.props.user[0];
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
                  <NavLink to="/loginPage">Go to Login</NavLink>
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        )}
        <div style={{ marginTop: 20 }}>
          <Card
            style={{
              boxShadow:
                "0px 4px 6px 0px rgba(0,0,0,0.2), 0px 4px 4px 0px rgba(0,0,0,0.14), 0px 6px 4px -4px rgba(0,0,0,0.12)"
            }}
          >
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
                    <p
                      style={{
                        fontFamily: "Roboto",
                        color: "#484848",
                        fontWeight: "bolder",
                        fontStyle: "italic",
                        marginTop: 10
                      }}
                    >
                      {this.props.itinerary.profileName}
                    </p>
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
                              <Favorite
                                onClick={this.openModal}
                                style={{ color: "#FF5B5E" }}
                              />
                            ) : (
                              <FavoriteBorder onClick={this.openModal} />
                            )}
                          </div>
                        ) : !this.state.isLoggedIn ? (
                          <IconButton color="primary" onClick={this.openModal}>
                            <Favorite style={{ color: "#D8D8D8" }} />
                          </IconButton>
                        ) : (
                          <div
                            onClick={e =>
                              this.addToFavourite(this.props.itinerary._id, e)
                            }
                            className="btn-floating pink itineraryLike"
                          >
                            {this.state.liked ? (
                              <Favorite style={{ color: "#FF5B5E" }} />
                            ) : (
                              <FavoriteBorder />
                            )}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="itineraryInfo">
                      <div className="itineraryLikes">
                        <ThumbUp
                          style={{
                            fontSize: 18,
                            color: "#5C5B5B",
                            marginRight: 5
                          }}
                        />
                        {this.props.itinerary.likes}
                      </div>
                      <div className="itineraryHours">
                        <AccessTime
                          style={{
                            fontSize: 18,
                            color: "#5C5B5B",
                            marginRight: 5
                          }}
                        />
                        {this.props.itinerary.hours} hr
                      </div>
                      <div
                        className="itineraryExpense"
                        style={{ color: "#5C5B5B" }}
                      >
                        {this.props.itinerary.expense}
                      </div>
                    </div>
                    <div className="itineraryHashtags">
                      {this.props.itinerary.hashtags.map((hashtag, index) => (
                        <div key={index} className="itineraryHashtag">
                          {hashtag}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              {this.state.showActivity ? (
                <ActivityTrial property={this.props.itinerary._id} />
              ) : null}
            </CardContent>
            <CardActions style={{ justifyContent: "center" }}>
              <button
                style={{ backgroundColor: "#ff5b5e", borderColor: "#ff5b5e" }}
                className="btn btn-secondary cardAction"
                id={this.props.itinerary._id}
                onClick={e => this.handleToggle(e)}
              >
                {this.state.showActivity ? (
                  <div className="center">
                    <span>Close</span> <Up />
                  </div>
                ) : (
                  <div className="center">
                    <span>View All</span> <Down />
                  </div>
                )}
              </button>
            </CardActions>
          </Card>
        </div>
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

    removeFavourite,
    addToFavourites
  }
)(Itinerary);
