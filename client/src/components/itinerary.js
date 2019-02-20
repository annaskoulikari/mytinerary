import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { fetchItineraries } from "../actions/itineraryActions";
import { getProfile } from "../actions/profileActions";

import close from "../images/close.png";

import { NavLink } from "react-router-dom";

import ActivityTrial from "./activityTrial";
import axios from "axios";

import "../App.css";
import {
  getFavourites,
  getFavouriteItinerary
} from "../actions/favouriteActions";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import CardHeader from "@material-ui/core/CardHeader";
import Favorite from "@material-ui/icons/Favorite";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
import Close from "@material-ui/icons/Close";

class Itinerary extends Component {
  async isLiked() {
    var user = this.props.user.email;
    await this.props.getFavourites(user);

    var favouritesArray = [];
    this.props.favourites.forEach(favourite =>
      favouritesArray.push(favourite._id)
    );
    console.log("this should be array of favourites id", favouritesArray);
    if (favouritesArray.includes(this.props.itinerary._id)) {
      this.setState({ liked: true });
    }
  }
  componentDidMount() {
    this.props.getProfile();

    console.log(this.props);

    // var user = this.props.user.email;

    this.isLiked();
  }

  constructor(props) {
    super(props);
    this.state = {
      selectedItinerary: "",
      showActivity: false,

      open: false,
      imageClose: close,
      liked: false
    };

    this.closeModal = this.closeModal.bind(this);
  }

  handleToggle(e) {
    e.preventDefault();

    this.setState({
      showActivity: !this.state.showActivity
    });
  }

  addToFavourite(itineraryId, e) {
    this.setState({ open: true });
    console.log("yeah we are gonna add to favourite");
    console.log(itineraryId);
    console.log(this.props.user);
    var itineraryFavourite = itineraryId;
    var user = this.props.user;
    axios
      .post("https://localhost:5000/testItinerary/itineraries/favourite", {
        itineraryFavourite: itineraryFavourite,
        user: user
      })
      .then(res => {
        console.log(res);
      });
  }

  closeModal() {
    this.setState({ open: false, liked: false });
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false, liked: true });
  };

  render() {
    const style = {
      justifyContent: "center"
    };

    const dialog = {
      textAlign: "center"
    };

    return (
      <div>
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
              {/* <DialogContentText style={dialog} id="alert-dialog-description">
                MYtinerary added to your Favourite
              </DialogContentText> */}
              {this.state.liked ? (
                <DialogContentText style={dialog} id="alert-dialog-description">
                  This MYtinerary is already in your favourites! (-:)
                </DialogContentText>
              ) : (
                <DialogContentText style={dialog} id="alert-dialog-description">
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
                    <div
                      onClick={e =>
                        this.addToFavourite(this.props.itinerary._id, e)
                      }
                      className="btn-floating pink itineraryLike"
                    >
                      {this.state.liked ? <Favorite /> : <FavoriteBorder />}
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
            <div class="cardAction">
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
  user: state.loggedInUserGoogle.loggedInUserGoogle,
  favourites: state.favourites.favourites
});

export default connect(
  mapStateToProps,
  { fetchItineraries, getProfile, getFavourites, getFavouriteItinerary }
)(Itinerary);
