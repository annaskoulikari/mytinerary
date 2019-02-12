import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchActivities } from "../actions/activityActions";
import PropTypes from "prop-types";
import "../App.css";

import Slider from "react-animated-slider";
import "react-animated-slider/build/horizontal.css";

import Comments from "./comments";

class Activity extends Component {
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
        <Slider>
          {activitiesArray.map(activity => (
            <div key={activity._id}>
              <img
                className="sliderImage"
                alt="of activity"
                src={activity.activityImage}
              />
              <h2>{activity.name}</h2>
            </div>
          ))}
        </Slider>
        <Comments property={this.props.property} />
      </div>
    );
  }
}

Activity.propTypes = {
  fetchActivities: PropTypes.func.isRequired
  // activities: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  activities: state.activities.activity
});

export default connect(
  mapStateToProps,
  { fetchActivities }
)(Activity);
