import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import logout from "../images/logout.png";

import { getProfile } from "../actions/profileActions";

class ProfilePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logoutImage: logout,
      isLoggedIn: false
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    window.localStorage.removeItem("user");
    this.setState({ isLoggedIn: false });
  }
  componentDidMount() {
    if (localStorage.getItem("user") != null) {
      this.setState({ isLoggedIn: true });
    }
    this.props.getProfile();
    console.log(this.props.profile);
  }
  render() {
    return (
      <div>
        <h1> This is the profile page</h1>
        <div>{"email:" + this.props.profile.email}</div>
        <div>{"name:" + this.props.profile.name}</div>
        {this.state.isLoggedIn ? (
          <img
            className="image"
            src={this.state.logoutImage}
            alt="logout"
            onClick={e => this.handleClick(e)}
          />
        ) : null}
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
