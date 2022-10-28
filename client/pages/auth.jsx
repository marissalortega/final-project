import AppContext from '../lib/app-context';
import React from 'react';
import Redirect from '../components/redirect';
import AuthForm from '../components/auth-form';

export default class AuthPage extends React.Component {
  render() {
    const { user, route, handleSignIn } = this.context;

    if (user) return <Redirect to="" />;

    const welcomeMessage = route.path === 'sign-in'
      ? 'Please sign in to continue'
      : 'Create an account to get started!';

    return (
      <div>
        <div className="text-center mt-5">
          <header>
            <h2>
              NavBar
            </h2>
            <p>{ welcomeMessage }</p>
          </header>
          <div>
            <AuthForm
                key={route.path}
                action={route.path}
                onSignIn={handleSignIn} />
          </div>
        </div>
      </div>
    );
  }
}

AuthPage.contextType = AppContext;
