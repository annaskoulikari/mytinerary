import React, { Component } from "react";
import Favourite from "./favourite";
import { getProfile } from "../actions/profileActions";
import { getFavourites } from "../actions/favouriteActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class FavouritesContainer extends Component {
  // constructor(props){
  //     super(props)
  // }

  //  getProfile = () =>  {
  //     this.props.getProfile()
  // }

  //   getFavourites = user => {
  //     this.props.getFavourites(user);
  //   };

  getProfileAndFavourites = callback => {
    this.props.getProfile();
    var user = this.props.profile;
    callback(user);
  };

  componentDidMount() {
    // this.props.getProfile();
    this.getProfileAndFavourites(() => {
      var user = this.props.profile[0];
      console.log("this should be user", user);
      this.props.getFavourites(user);
      console.log(this.props);
    });
  }
  render() {
    return (
      <div>
        <div>THIS IS PROFILE CONTAINER</div>
        <Favourite profile={this.props.profile[0]} />
      </div>
    );
  }
}

FavouritesContainer.propTypes = {
  getProfile: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile.profile
});

export default connect(
  mapStateToProps,
  {
    getProfile,
    getFavourites
  }
)(FavouritesContainer);
