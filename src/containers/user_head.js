import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { login, logout } from "../actions/action_auth";
import _ from "lodash";

import { commentsCounter } from "../helpers";

class UserHead extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openMenu: false
    };

    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    this.setState(prevState => ({
      openMenu: !prevState.openMenu
    }));
  }

  googleLogin() {
    this.props.login();
  }

  googleLogout() {
    this.props.logout();
  }

  checkComments(posts) {
    if (_.isEmpty(posts)) {
      return 0;
    }
    let total = 0;
    _.map(posts, post => {
      if (post.user.uid === this.props.authedUser.uid) {
        total +=
          commentsCounter(post.comments) -
          (post.user.readed ? post.user.readed : 0);
      }
    });
    return total;
  }

  render() {
    const dropClass = `dropdown mr-2 ${this.state.openMenu ? "show" : ""}`;
    const menuClass = `dropdown-menu ${this.state.openMenu ? "show" : ""}`;

    if (this.props.authedUser) {
      let newComments = this.checkComments(this.props.posts);

      if (newComments === 0) {
        return (
          <div className="m-userhead">
            <div className={dropClass}>
              <button
                className="btn btn-dark dropdown-toggle btn-sm"
                type="button"
                onClick={this.onClick}
              >
                {this.props.authedUser.displayName}
              </button>
              <div className={menuClass} aria-labelledby="dropdownMenuButton">
                <Link to={"/user-posts"} className="dropdown-item">
                  My posts
                </Link>
                <a
                  className="dropdown-item"
                  onClick={this.googleLogout.bind(this)}
                  href="#"
                >
                  Log out
                </a>
              </div>
            </div>
            <img src={this.props.authedUser.photoURL} />
          </div>
        );
      } else {
        return (
          <div className="m-userhead">
            <div className={dropClass}>
              <button
                className="btn btn-dark dropdown-toggle btn-sm"
                type="button"
                onClick={this.onClick}
              >
                {this.props.authedUser.displayName}
              </button>
              <div className={menuClass} aria-labelledby="dropdownMenuButton">
                <Link to={"/user-posts"} className="dropdown-item">
                  My posts
                </Link>
                <a
                  className="dropdown-item"
                  onClick={this.googleLogout.bind(this)}
                  href="#"
                >
                  Log out
                </a>
              </div>
            </div>
            <img src={this.props.authedUser.photoURL} />
            <span className="badge badge-pill badge-danger">{newComments}</span>
          </div>
        );
      }
    } else {
      return (
        <div className="m-userhead">
          <button
            className="btn btn-dark btn-sm"
            onClick={this.googleLogin.bind(this)}
          >
            {" "}
            Login
          </button>
        </div>
      );
    }
  }
}

function mapStateToProps(state) {
  return {
    authedUser: state.authedUser,
    posts: state.posts
  };
}

export default connect(mapStateToProps, { login, logout })(UserHead);
