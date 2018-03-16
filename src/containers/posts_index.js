import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchPosts } from '../actions/action_posts';
import { login, logout } from '../actions/action_auth';
import _ from 'lodash';

// postsService.getPosts().then((snapshot)=>{
//   console.log(snapshot.val());
// });

class PostIndex extends Component {
  componentDidMount() {
    this.props.fetchPosts();
  }

  commentsCounter(comments) {
    let total = 0;
    if (comments) {
      total = _.reduce(comments, function (sum, n) {
        return sum + n;
      });
    }
    return total;
  }

  renderPosts() {
    return _.map(this.props.posts, (post, key) => {
      const badgeClass = `badge badge-primary badge-pill badge-mode--${post.mode ? post.mode : "java"}`;
      return (
        <li key={key} className="list-group-item list-group-item-action d-flex justify-content-between">
          <div>
            <Link to={`/posts/${key}`}>
              {post.title}
            </Link>
            <span className="badge badge-primary badge-pill ml-2">{this.commentsCounter(post.comments)}</span>
          </div>
          <div>
            <span className={badgeClass}>{post.mode ? post.mode : 'java'}</span>
          </div>
        </li>
      );
    });
  }

  googleLogin() {
    this.props.login();
  }

  googleLogout() {
    this.props.logout();
  }

  render() {
    return (
      <div className="mt-5 mb-5">
        <Link to={'/post-new'} className="btn btn-success">
          New post
        </Link>
        <ul className="list-group mt-5">
          {this.renderPosts()}
        </ul>
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

export default connect(mapStateToProps, { fetchPosts, login, logout })(PostIndex);