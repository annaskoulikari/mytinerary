import React, { Component } from "react";

import { connect } from "react-redux";
import { getFavourites } from "../actions/favouriteActions";
import { getProfile } from "../actions/profileActions";
import PropTypes from "prop-types";
import Header from "./header";
import Itinerary from "./itinerary";
import { fetchActivities } from "../actions/activityActions";
import { postComment } from "../actions/commentActions";

class Favourite extends Component {
  async fetchEverything() {
    let itinerariesArray = [];
    // await this.props.getProfile();
    console.log(this.props.profile[0]);
    var user = this.props.profile[0].email;
    console.log("user", user);

    // await this.props.getFavourites(user);
    // this.props.getFavourites(user);

    this.props.favourites.map(itinerary =>
      itinerariesArray.push(itinerary._id)
    );

    this.props.fetchActivities(itinerariesArray);
    this.props.postComment(itinerariesArray);
  }

  componentDidMount() {
    let user = localStorage.getItem("user");
    if (user) {
      this.setState({ isLoggedIn: true });
      this.fetchEverything();
    } else {
      this.setState({ isLoggedIn: false });
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false
    };
  }
  render() {
    return (
      <div className="container" style={{ marginBottom: "40px" }}>
        <Header />
        <h1>Favourites</h1>
        <div className="favouriteContent">
          {!this.state.isLoggedIn ? (
            <div className="noLoginFavourites">
              {" "}
              Oops you haven't logged in!
              <span
                role="img"
                aria-label="smiling face with open mouth and cold sweat"
              >
                😅{" "}
              </span>
              Please log in order to see your{" "}
              <span role="img" aria-label="red heart">
                ❤️'s
              </span>
            </div>
          ) : this.props.favourites.length !== 0 ? (
            this.props.favourites.map(favourite => (
              <Itinerary
                key={favourite._id}
                useCase="favourite"
                itinerary={favourite}
                favourites={this.props.favourites}
              />
            ))
          ) : (
            <div className="noLoginFavourites">
              {" "}
              Oops it seems you don't have any favourites!
              <span
                role="img"
                aria-label="smiling face with open mouth and cold sweat"
              >
                😅{" "}
              </span>
              Go check out all the fun itineraries and find the ones that speak
              to you!{" "}
              <span role="img" aria-label="left pointing magnifying glass">
                🔍
              </span>
            </div>
          )}
        </div>
      </div>
    );
  }
}

Favourite.propTypes = {
  getFavourites: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  favourites: state.favourites.favourites,
  profile: state.profile.profile
});

export default connect(
  mapStateToProps,
  {
    getProfile,
    getFavourites,

    fetchActivities,
    postComment
  }
)(Favourite);
