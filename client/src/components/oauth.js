import React, { Component } from "react";

class OAuth extends Component {
  state = {
    user: {},
    disabled: ""
  };

  componentDidMount() {
    const { socket, provider } = this.props;
    console.log("this is socket and provider", socket, provider);

    console.log("this is the provider", provider);

    socket.on(provider, user => {
      this.popup.close();
      this.setState({ user });
      console.log("this is callback function for socket even in client");
    });
  }

  checkPopup() {
    const check = setInterval(() => {
      const { popup } = this;
      if (!popup || popup.closed || popup.closed === undefined) {
        clearInterval(check);
        this.setState({ disabled: "" });
      }
    }, 1000);
  }

  openPopup() {
    const { provider, socket } = this.props;
    const width = 600,
      height = 600;
    const left = window.innerWidth / 2 - width / 2;
    const top = window.innerHeight / 2 - height / 2;
    const url = "http://localhost:5000/auth/google/?socketId=" + socket.id;

    console.log("this is my url", url);
    console.log("this is my socket id", socket.id);

    return window.open(
      url,
      "",
      `toolbar=no, location=no, directories=no, status=no, menubar=no,
        scrollbars=no, resizable=no, copyhistory=no, width=${width},
        height=${height}, top=${top}, left=${left}`
    );
  }

  startAuth(e) {
    if (!this.state.disabled) {
      e.preventDefault();
      this.popup = this.openPopup();
      this.checkPopup();
      this.setState({ disabled: "disabled" });
    }
  }

  closeCard() {
    this.setState({ user: {} });
  }

  render() {
    const { email } = this.state.user;
    const { provider } = this.props;

    return (
      <div>
        {email ? (
          <div>
            <h1>{email}</h1>
          </div>
        ) : (
          <div>
            <button onClick={this.startAuth.bind(this)} />
            {provider}
          </div>
        )}
      </div>
    );
  }
}

export default OAuth;
