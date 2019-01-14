import React, { Component } from "react";

import { connect } from "react-redux";
import { postComment, addComment } from "../actions/commentActions";
import PropTypes from "prop-types";
import "../App.css";

class Comments extends Component {
  componentDidMount() {
    // what I need to do is pass itinierary_id in some other way to this component and then redefine the variable
    var itinerary_id = this.props.property;
    console.log(itinerary_id);
    this.props.postComment(itinerary_id);
    console.log(itinerary_id);
    console.log(this.props);
  }

  user = React.createRef();
  comment = React.createRef();
  commentForm = React.createRef();

  handleSubmit(e) {
    e.preventDefault();
    console.log(e);
    console.log(this.user.current.value);
    console.log(this.comment.current.value);
    var user = this.user.current.value;
    var comment = this.comment.current.value;
    var itinerary_id = this.props.property;
    console.log(itinerary_id, user, comment);
    this.props.addComment(itinerary_id, user, comment);
    this.props.postComment(itinerary_id);
    console.log(this.props.comment);
  }

  render() {
    return (
      <div>
        <div className="commentArea">
          <div className="commentForm">
            <form ref={this.commentForm} onSubmit={e => this.handleSubmit(e)}>
              <input type="text" ref={this.user} placeholder="user" />
              <input
                type="text"
                ref={this.comment}
                placeholder="Your comment..."
              />
              <input type="submit" hidden />
            </form>
          </div>
          <div className="commentAll">
            {this.props.comment.reverse().map(comment => (
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
  comment: state.comments.comment
});

export default connect(
  mapStateToProps,
  { postComment, addComment }
)(Comments);
