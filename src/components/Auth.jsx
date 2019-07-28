import React, { Component, Link } from 'react';
import Profile from './Profile.jsx';
import Signin from './Signin.jsx';
import {
  UserSession,
  AppConfig
} from 'blockstack';

const appConfig = new AppConfig()
const userSession = new UserSession({ appConfig: appConfig })

export default class Auth extends Component {

  constructor(props) {
  	super(props);
  }

  handleSignIn(e) {
    e.preventDefault();
    userSession.redirectToSignIn();
  }

  handleSignOut(e) {
    e.preventDefault();
    userSession.signUserOut(window.location.origin);
  }

  render() {
    return (
      <div class ="Auth">
          { !userSession.isUserSignedIn() ?
            <button
              className="btn btn-primary"
              onClick={ this.handleSignIn }
              Sign In
            >
              Sign In
            </button>
            : <button
              className="btn btn-secondary"
              onClick={ this.handleSignOut }
              Sign Out
            >
              Sign Out
            </button>
          }
      </div>
    );
  }

  componentWillMount() {
    if (userSession.isSignInPending()) {
      userSession.handlePendingSignIn().then((userData) => {
        window.location = window.location.origin;
      });
    }
  }
}