import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchPosts } from "../actions/action_posts";
import { login, logout } from "../actions/action_auth";
import _ from "lodash";

import { commentsCounter } from "../helpers";

// postsService.getPosts().then((snapshot)=>{
//   console.log(snapshot.val());
// });

class UserPosts extends Component {
  componentDidMount() {
    this.props.fetchPosts();
  }

  renderPosts() {
    return _.map(this.props.posts, (post, key) => {
      const badgeClass = `badge badge-primary badge-pill badge-mode--${
        post.mode ? post.mode : "java"
      }`;
      if (post.user.uid !== this.props.authedUser.uid) {
        return;
      }
      let newComments =
        commentsCounter(post.comments) -
        (post.user.readed ? post.user.readed : 0);
      const countClass = `badge badge-danger badge-pill ml-2 ${
        newComments === 0 ? "hide" : ""
      }`;
      return (
        <li
          key={key}
          className="list-group-item list-group-item-action d-flex justify-content-between"
        >
          <div>
            <Link to={`/posts/${key}`}>{post.title}</Link>
            <span className={countClass}>{newComments}</span>
          </div>
          <div>
            <span className={badgeClass}>{post.mode ? post.mode : "java"}</span>
          </div>
        </li>
      );
    });
  }

  render() {
    return (
      <div className="mt-5 mb-5">
        <ul className="list-group mt-5">{this.renderPosts()}</ul>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    posts: state.posts,
    authedUser: state.authedUser
  };
}

export default connect(mapStateToProps, { fetchPosts, login, logout })(
  UserPosts
);
