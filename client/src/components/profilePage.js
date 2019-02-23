import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import logout from "../images/logout.png";

import { getProfile } from "../actions/profileActions";

import Header from "./header";

class ProfilePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logoutImage: logout,
      isLoggedIn: false,
      user: ""
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    window.localStorage.removeItem("user");
    window.localStorage.removeItem("email");
    this.setState({ isLoggedIn: false });
  }

  async makeSureLogin() {
    await this.props.getProfile();

    if (localStorage.getItem("user") != null) {
      this.setState({ isLoggedIn: true });
    }

    let profile = this.props.profile[0];
    this.setState({ user: profile });
    console.log("ths is profile", profile);
  }
  componentDidMount() {
    this.makeSureLogin();
  }

  render() {
    return (
      <div className="container">
        <Header />
        <h1>Profile</h1>

        {this.state.isLoggedIn ? (
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

            <div
              className=" cardItem btn btn-primary"
              onClick={e => this.handleClick(e)}
            >
              Log Out
            </div>
          </div>
        ) : (
          <div className="noLoginFavourites">
            {" "}
            Oops you haven't logged in!
            <span
              role="img"
              aria-label="smiling face with open mouth and cold sweat"
            >
              😅{" "}
            </span>
            Please log in order to see your account
            <span role="img" aria-label="thumbs up sign">
              👍🏻
            </span>
          </div>
        )}
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
