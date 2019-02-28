import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import AccountCircle from "@material-ui/icons/AccountCircle";
import { getProfile } from "../actions/profileActions";

class ProfilePage extends Component {
  componentDidMount() {
    console.log(this.props.profile);
  }

  render() {
    return (
      <div>
        <h1 style={{ fontSize: "20px" }}>Profile</h1>

        <div className="profileContents">
          {this.props.profile[0].profilePhoto != null ? (
            <div>
              <img
                className="profilePhoto"
                alt="profile"
                src={this.props.profile[0].profilePhoto}
              />
            </div>
          ) : (
            <div>
              <AccountCircle style={{ fontSize: 100 }} />
            </div>
          )}

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
