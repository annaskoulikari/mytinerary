import React, { Component } from "react";

class Toggle extends Component {
  state = {
    on: false
  };

  // state = {
  //   itinerary_id: []
  // };

  toggle = () => {
    console.log();
    this.setState({
      on: !this.state.on,
      itinerary_id: this.props.propertyViewAll
    });
  };

  render() {
    const { children } = this.props;
    console.log(this.props);
    console.log(this.state.on);
    console.log(this.state, this.props.propertyViewAll);

    return children({
      on: this.state.on,
      toggle: this.toggle
    });
  }
}

export default Toggle;
