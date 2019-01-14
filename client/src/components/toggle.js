import React, { Component } from "react";

class Toggle extends Component {
  state = {
    on: false
  };

  toggle = () => {
    this.setState({
      on: !this.state.on,
      itinerary_id: this.props.propertyViewAll
    });
  };

  render() {
    const { children } = this.props;
    console.log(this.props);
    console.log(this.state.on);
    console.log(this.props.propertyViewAll);

    return children({
      on: this.state.on,

      toggle: this.toggle
    });
  }
}

export default Toggle;
