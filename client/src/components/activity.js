import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchActivities } from "../actions/activityActions";
import PropTypes from "prop-types";
import "../App.css";

import Slider from "react-animated-slider";
import "react-animated-slider/build/horizontal.css";

class Activity extends Component {
  componentDidMount() {
    console.log(this.props);
    var itinerary_id = this.props.match.params.id;
    this.props.fetchActivities(itinerary_id);
    console.log(itinerary_id);
  }

  render() {
    return (
      <div>
        <Slider>
          {this.props.activities.map(activity => (
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
      </div>
    );
  }
}

Activity.propTypes = {
  fetchActivities: PropTypes.func.isRequired,
  activities: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  activities: state.activities.activity
});

export default connect(
  mapStateToProps,
  { fetchActivities }
)(Activity);
