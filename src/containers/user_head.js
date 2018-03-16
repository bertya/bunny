import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { login, logout } from '../actions/action_auth';

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

  render() {
    const dropClass = `dropdown mr-2 ${this.state.openMenu ? 'show' : ''}`;
    const menuClass = `dropdown-menu ${this.state.openMenu ? 'show' : ''}`;

    if (this.props.authedUser) {
      return (
        <div className="m-userhead">
          <div className={dropClass}>
            <button className="btn btn-dark dropdown-toggle btn-sm" type="button" onClick={this.onClick}>
              {this.props.authedUser.displayName}
            </button>
            <div className={menuClass} aria-labelledby="dropdownMenuButton">
              <a className="dropdown-item" href="#">My account</a>
              <a className="dropdown-item" onClick={this.googleLogout.bind(this)} href="#">Log out</a>
            </div>
          </div>
          <img src={this.props.authedUser.photoURL} />
        </div>
      );
    } else {
      return (
        <div className="m-userhead">
          <button className="btn btn-dark btn-sm" onClick={this.googleLogin.bind(this)}> Login</button>
        </div>
      );
    }
  }
}

function mapStateToProps(state) {
  return {
    authedUser: state.authedUser
  };
}

export default connect(mapStateToProps, { login, logout })(UserHead);