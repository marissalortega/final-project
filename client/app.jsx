import React from 'react';
import AppContext from './lib/app-context';
import Home from './pages/home';
import NotFound from './pages/not-found';
import Navbar from './components/navbar';
import { parseRoute } from './lib';
import Auth from './pages/auth';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      isAuthorizing: true,
      route: parseRoute(window.location.hash)
    };
    this.handleSignIn = this.handleSignIn.bind(this);
    this.handleSignOut = this.handleSignOut.bind(this);
  }

  componentDidMount() {
    window.addEventListener('hashchange', () => {
      this.setState({ route: parseRoute(window.location.hash) });
    });
    // const token = window.localStorage.getItem('jwt');
    // const user = token ? jwtDecode(token) : null;
    // this.setState({ user, isAuthorizing: false });
  }

  handleSignIn(result) {
    const { user, token } = result;
    window.localStorage.setItem('jwt', token);
    this.setState({ user });
  }

  handleSignOut() {
    window.localStorage.removeItem('jwt');
    this.setState({ user: null });
  }

  renderPage() {
    const { path } = this.state.route;
    if (path === '') {
      return <Home />;
    }
    if (path === 'sign-in' || path === 'register') {
      return <Auth />;
    }
    return <NotFound />;
  }

  render() {
    if (this.setState.isAuthorizing) return null;
    const { user, route } = this.state;
    const { handleSignIn, handleSignOut } = this;
    const contextValue = { user, route, handleSignIn, handleSignOut };
    return (
      <AppContext.Provider value={contextValue}>
        <div className="container-fluid">
          <Navbar />
          { this.renderPage() }
        </div>
      </AppContext.Provider>
    );
  }
}
