import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { getProfile } from "../actions/profileActions";

class ProfilePage extends Component {
  state = {};

  componentDidMount() {
    this.props.getProfile();
    console.log(this.props.profile);
  }
  render() {
    return (
      <div>
        <h1> This is the profile page</h1>
        <div>{"email:" + this.props.profile.email}</div>
        <div>{"name:" + this.props.profile.name}</div>
      </div>
    );
  }
}

ProfilePage.propTypes = {
  getProfile: PropTypes.func.isRequired,
  profile: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile.profile
});

export default connect(
  mapStateToProps,
  { getProfile }
)(ProfilePage);
