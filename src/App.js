import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import logo from './logo.svg';
import './styles/App.css';

import PostsIndex from './containers/posts_index';
import PostNew from './containers/post_new';
import PostShow from './containers/post_show';
import authService from './services/service_auth';
import { updateAuthedStatus } from './actions/action_auth';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    authService.isLoggedIn() === true
      ? <Component {...props} />
      : <Redirect to='/' />
  )}/>
);

class App extends Component {

  componentDidMount() {
    // this.props.updateAuthedStatus();
    authService.watch((user)=>{
      this.props.updateAuthedStatus(user);
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div className="container">
            <h1 className="App-title">Bunny</h1>
            <p>Welcome : { this.props.authedUser ? this.props.authedUser.displayName : 'Guest' }</p>
          </div>
        </header>
        <BrowserRouter>
          <div className="container">
            <Switch>
              <PrivateRoute path="/post-new" component={PostNew} />
              <Route path="/posts/:id" component={PostShow} />
              <Route path="/" component={PostsIndex} />
              {/* <Route path="/post-new" render={() => (<div>hahah</div>)}/> */}
            </Switch>
          </div>
        </BrowserRouter>
        <footer className="g-footer">
          Bunny 2018
        </footer>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    authedUser: state.authedUser
  };
}

export default connect( mapStateToProps ,{updateAuthedStatus})(App);