import AppContext from '../lib/app-context';
import React from 'react';
import Redirect from '../components/redirect';

export default class Home extends React.Component {
  render() {
    if (!this.context.user) return <Redirect to="sign-in" />;

    return (
      <div>
        <p>You are logged in!!</p>
      </div>
    );
  }
}

Home.contextType = AppContext;
