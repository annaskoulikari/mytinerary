import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { fetchItineraries } from "../actions/itineraryActions";
import { getProfile } from "../actions/profileActions";
import "../App.css";
import favourite from "../images/favourite.png";
import favourited from "../images/favourited.png";

import Activity from "./activity";
import axios from "axios";

class Itinerary extends Component {
  componentDidMount() {
    this.props.getProfile();
    var city = this.props.match.params.city;
    this.props.fetchItineraries(city);
    console.log(this.props);
    console.log(this.props.match.params.city);
    console.log(this.state);
  }

  constructor() {
    super();
    this.state = {
      selectedItinerary: "",
      image: favourite
    };
  }

  handleToggle(e) {
    e.preventDefault();
    e.persist();
    console.log(e);
    console.log(e.target.id);
    this.setState({
      selectedItinerary: e.target.id
    });
  }

  addToFavourite(itineraryId, e) {
    console.log("yeah we are gonna add to favourite");
    console.log(itineraryId);
    console.log(this.props.user);
    var itineraryFavourite = itineraryId;
    var user = this.props.user;
    axios
      .post("http://localhost:5000/testItinerary/itineraries/favourite", {
        itineraryFavourite: itineraryFavourite,
        user: user
      })
      .then(res => {
        console.log(res);
      });
  }

  render() {
    return (
      <div>
        <h1>City</h1>
        <h2>Available MYitenaries</h2>

        {this.props.itineraries.map(itinerary => (
          <div key={itinerary._id} className="itineraryContainer">
            <div className="itineraryFirstRow">
              {" "}
              <div className="profilePhoto">Profilephoto</div>
              <div className="itineraryInfo">
                <div className="itineraryTitle">{itinerary.title}</div>
                <div>
                  <img
                    onClick={e => this.addToFavourite(itinerary._id, e)}
                    className="itineraryHeart"
                    src={this.state.image}
                    alt="like"
                  />
                </div>
                <div className="itineraryDetails">
                  <div className="itineraryLikes">
                    {"Likes :" + itinerary.likes}
                  </div>
                  <div className="itineraryDuration">
                    {itinerary.hours + " " + "Hours"}
                  </div>
                  <div className="itineraryExpense">{itinerary.expense}</div>
                </div>
              </div>
            </div>
            <div className="itinerarySecondRow">
              <div className="profileName">{itinerary.profileName}</div>
              <div className="itineraryHashtags">HASHTAGS</div>
            </div>
            <img
              className="sliderImage"
              src={itinerary.itineraryImage}
              alt="stuff"
            />
            <div>
              {this.state.selectedItinerary === itinerary._id ? (
                <Activity property={itinerary._id} />
              ) : null}
              <button id={itinerary._id} onClick={e => this.handleToggle(e)}>
                View All
              </button>
            </div>
          </div>
        ))}
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
  user: state.loggedInUserGoogle.loggedInUserGoogle
});

export default connect(
  mapStateToProps,
  { fetchItineraries, getProfile }
)(Itinerary);
