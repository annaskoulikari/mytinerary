import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchActivities } from "../actions/activityActions";
import PropTypes from "prop-types";
import "../App.css";

import "react-animated-slider/build/horizontal.css";

import Comments from "./comments";

import SwipeableTextMobileStepper from "./swipeableTextMobileStepper";

class ActivityTrial extends Component {
  componentDidMount() {}

  render() {
    //console.log(this.props.selected);
    var itinerary_id = this.props.property;
    let activitiesArray = [];
    this.props.activities.activities.forEach(activity => {
      if (activity.itinerary_id === itinerary_id) {
        activitiesArray.push(activity);
      }
    });
    console.log(
      "this should be just activities for this itinerary",
      activitiesArray
    );

    return (
      <div>
        <SwipeableTextMobileStepper activities={activitiesArray} />

        <Comments property={this.props.property} />
      </div>
    );
  }
}

ActivityTrial.propTypes = {
  fetchActivities: PropTypes.func.isRequired
  // activities: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  activities: state.activities.activity
});

export default connect(
  mapStateToProps,
  { fetchActivities }
)(ActivityTrial);
