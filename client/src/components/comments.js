import React, { Component } from "react";

import { connect } from "react-redux";
import { postComment, addComment } from "../actions/commentActions";
import { checkAccount } from "../actions/loginActions";
import PropTypes from "prop-types";
import "../App.css";
import TextField from "@material-ui/core/TextField";
import Send from "@material-ui/icons/Send";

class Comments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      multiline: ""
    };
  }

  componentDidMount() {
    var itinerary_id = this.props.property;

    this.props.postComment(itinerary_id);
  }

  handleSubmit(e) {
    e.preventDefault();

    let comment = this.state.multiline;

    let itinerary_id = this.props.property;
    let itinerariesArray = [];
    this.props.itineraries.forEach(itinerary => {
      itinerariesArray.push(itinerary._id);
    });

    this.props.addComment(itinerary_id, comment, itinerariesArray);
    this.props.postComment(itinerary_id);
    this.setState({ multiline: "" });
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  render() {
    let arrayOfComments = [];
    this.props.comment.forEach(comment => {
      if (comment.itinerary_id === this.props.property) {
        arrayOfComments.push(comment);
      }
    });

    const style = {
      width: "250px"
    };

    return (
      <div>
        <div className="commentArea">
          <div className="commentForm">
            <form autoComplete="off" onSubmit={e => this.handleSubmit(e)}>
              <div className="commentMaterial">
                <TextField
                  id="outlined-multiline-flexible"
                  label="Comment"
                  // multiline
                  rowsMax="4"
                  style={style}
                  value={this.state.multiline}
                  onChange={this.handleChange("multiline")}
                  margin="normal"
                  placeholder="Your comment..."
                  variant="outlined"
                />
                <Send
                  className="sendButton"
                  onClick={e => this.handleSubmit(e)}
                  style={{ color: "#484848" }}
                />
              </div>
            </form>
          </div>
          <div className="commentAll">
            {arrayOfComments.reverse().map(comment => (
              <div className="commentContainer" key={comment._id}>
                <div className="commentUser">{comment.user}</div>
                <div className="commentText">{comment.comment}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

Comments.propTypes = {
  postComment: PropTypes.func.isRequired,
  comment: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  comment: state.comments.comment,
  loggedInUser: state.loggedInUser.loggedInUser,
  itineraries: state.itineraries.item
});

export default connect(
  mapStateToProps,
  { postComment, addComment, checkAccount }
)(Comments);
