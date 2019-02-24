import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { getProfile } from "../actions/profileActions";

class ProfilePage extends Component {
  componentDidMount() {
    console.log(this.props.profile);
  }

  render() {
    return (
      <div className="container">
        <h1>Profile</h1>

        <div className="profileContents">
          {/* <img
              alt="profile"
              src={this.props.loggedInUser.user.profilePhoto}
            /> */}
          <div className=" cardItem card border-info ">
            <div className="card-body text-info profileCard">
              <h5 className="card-title ">Name: </h5>
              <p className="card-text cardText">
                {this.props.profile[0].firstName}
              </p>
            </div>
          </div>
          <div />
          <div className=" cardItem card border-info ">
            <div className="card-body text-info profileCard">
              <h5 className="card-title ">Email: </h5>
              <p className="card-text cardText">
                {this.props.profile[0].email}
              </p>
            </div>
          </div>
          <div />
        </div>
      </div>
    );
  }
}

ProfilePage.propTypes = {
  getProfile: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile.profile
});

export default connect(
  mapStateToProps,
  { getProfile }
)(ProfilePage);
