import React, { Component } from "react";
import Itinerary from "./itinerary";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { fetchItineraries } from "../actions/itineraryActions";
import { fetchActivities } from "../actions/activityActions";
import { postComment } from "../actions/commentActions";
import { NavLink } from "react-router-dom";
import { getFavourites } from "../actions/favouriteActions";
import Header from "./header";

class ItineraryList extends Component {
  async fetchEverything() {
    let itinerariesArray = [];
    var city = this.props.match.params.city;
    this.setState({ city: city });
    this.props.itineraries.map(itinerary =>
      itinerariesArray.push(itinerary._id)
    );

    await this.props.fetchItineraries(city);
    this.props.fetchActivities(itinerariesArray);
    this.props.postComment(itinerariesArray);
  }

  componentDidMount() {
    this.fetchEverything();
    console.log("this.props.itineraries", this.props.itineraries);

    if (this.props.itineraries.length > 0) {
      this.setState({ itinerariesPresent: true });
    } else {
      this.setState({ itinerariesPresent: false });
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      city: "",
      itinerariesPresent: false
    };
  }

  render() {
    return (
      <div>
        <Header />
        <div className="container itineraryListContainer">
          <h3>{this.state.city}</h3>
          <h3>Available MYitenaries</h3>
          {this.state.itinerariesPresent ? (
            <div className="itinerariesContainer">
              {" "}
              {this.props.itineraries.map(itinerary => (
                <Itinerary
                  key={itinerary._id}
                  profile={this.props.user}
                  itinerary={itinerary}
                />
              ))}
            </div>
          ) : (
            <div>
              Oops this city does not yet have any itineraries available!{" "}
              <span
                role="img"
                aria-label="smiling face with open mouth and cold sweat"
              >
                😅{" "}
              </span>
              Try another city!
            </div>
          )}

          <NavLink to="/citiesList">Choose Another City</NavLink>
        </div>
      </div>
    );
  }
}

ItineraryList.propTypes = {
  fetchItineraries: PropTypes.func.isRequired,
  itineraries: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  itineraries: state.itineraries.item,
  comment: state.comments.comment,
  user: state.profile.profile
});

export default connect(
  mapStateToProps,
  {
    fetchItineraries,
    fetchActivities,
    postComment,
    getFavourites
  }
)(ItineraryList);
