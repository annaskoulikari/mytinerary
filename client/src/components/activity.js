import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchActivities } from "../actions/activityActions";
import PropTypes from "prop-types";
import "../App.css";

import Slider from "react-animated-slider";
import "react-animated-slider/build/horizontal.css";

import Comments from "./comments";

class Activity extends Component {
  componentDidMount() {
    console.log(this.props);
    // what I need to do is pass itinierary_id in some other way to this component and then redefine the variable
    var itinerary_id = this.props.property;

    this.props.fetchActivities(itinerary_id);
    console.log(itinerary_id);
  }

  render() {
    //console.log(this.props.selected);
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
        <Comments property={this.props.property} />
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
