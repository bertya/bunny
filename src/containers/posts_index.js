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

  renderPosts() {
    return _.map(this.props.posts, (post, key) => {
      return (
        <li key={key} className="list-group-item list-group-item-action">
          <Link to={`/posts/${key}`}>
            {post.title}
          </Link>
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
        <div className="btn-group">
          <button className="btn btn-primary" onClick={this.googleLogin.bind(this)}>Login</button>
          <button className="btn btn-primary" onClick={this.googleLogout.bind(this)}>Log out</button>
          <Link to={'/post-new'} className="btn btn-success">
            new
          </Link>
        </div>
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