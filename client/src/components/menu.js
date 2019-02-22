import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

import List from "@material-ui/core/List";

import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";

import MenuItem from "@material-ui/core/MenuItem";

import MenuIcon from "@material-ui/icons/Menu";
import IconButton from "@material-ui/core/IconButton";
import { NavLink } from "react-router-dom";

import "../App.css";

const styles = {
  menuItem: {
    alignText: "center",
    color: "pink"
  }
};

class MenuShow extends React.Component {
  componentDidMount(props) {
    let user = localStorage.getItem("user");
    if (user) {
      this.setState({
        isLoggedIn: true
      });
    }
  }
  constructor(props) {
    super(props);
    this.state = {
      selected: "",
      isLoggedIn: false
    };
  }

  handleClose = () => {
    this.props.onClose(this.props.selectedValue);
  };

  handleListItemClick = value => {
    this.props.onClose(value);
  };

  // handleSelectedMenuItem = value => {
  //   this.setState({ selected: value });
  //   console.log(e)
  // };

  render() {
    const { classes, onClose, ...other } = this.props;

    var menuStyle = {
      width: "250px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    };

    const style = {
      textAlign: "center",
      justifyContent: "center"
    };

    return (
      <Dialog
        onClose={this.handleClose}
        aria-labelledby="simple-dialog-title"
        {...other}
        max-width="md"
      >
        <div>
          <div style={menuStyle}>
            <DialogTitle id="simple-dialog-title">Menu</DialogTitle>
            {this.state.isLoggedIn ? (
              <List>
                <NavLink to="/">
                  <MenuItem
                    value="Home"
                    name="Home"
                    style={style}
                    onClick={() => this.handleListItemClick()}
                  >
                    Home
                  </MenuItem>
                </NavLink>
                <NavLink to="/citiesList">
                  <MenuItem style={style} onClick={this.handleClose}>
                    Cities
                  </MenuItem>
                </NavLink>
                <NavLink to="/favouritePage">
                  <MenuItem style={style} onClick={this.handleClose}>
                    Favourites
                  </MenuItem>
                </NavLink>

                <NavLink to="/profilePage">
                  <MenuItem style={style} onClick={this.handleClose}>
                    Profile
                  </MenuItem>
                </NavLink>
              </List>
            ) : (
              <List>
                <NavLink to="/">
                  <MenuItem
                    value="Home"
                    name="Home"
                    style={style}
                    onClick={() => this.handleListItemClick()}
                  >
                    Home
                  </MenuItem>
                </NavLink>
                <NavLink to="/citiesList">
                  <MenuItem style={style} onClick={this.handleClose}>
                    Cities
                  </MenuItem>
                </NavLink>
                <NavLink to="/favouritePage">
                  <MenuItem style={style} onClick={this.handleClose}>
                    Favourites
                  </MenuItem>
                </NavLink>
                <NavLink to="/loginPage">
                  <MenuItem style={style} onClick={this.handleClose}>
                    Login
                  </MenuItem>
                </NavLink>
                <NavLink to="/signupPage">
                  <MenuItem style={style} onClick={this.handleClose}>
                    Create Account
                  </MenuItem>
                </NavLink>
              </List>
            )}
          </div>
        </div>
      </Dialog>
    );
  }
}

MenuShow.propTypes = {
  classes: PropTypes.object.isRequired,
  onClose: PropTypes.func
};

const MenuWrapped = withStyles(styles)(MenuShow);

class Menu extends React.Component {
  state = {
    open: false
  };

  handleClickOpen = () => {
    this.setState({
      open: true,
      selected: ""
    });
  };

  handleClose = value => {
    this.setState({ open: false, selected: value });
  };

  render() {
    return (
      <div>
        <br />

        <IconButton
          aria-label="More"
          aria-haspopup="true"
          onClick={this.handleClickOpen}
        >
          <MenuIcon />
        </IconButton>
        <MenuWrapped
          open={this.state.open}
          selected={this.state.selected}
          onClose={this.handleClose}
        />
      </div>
    );
  }
}

export default Menu;
