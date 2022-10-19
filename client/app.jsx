import React from 'react';
// import AppContext from './lib/app-context';
import Home from './pages/home';
import NotFound from './pages/not-found';
import Navbar from './components/navbar';
import { parseRoute } from './lib';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      route: parseRoute(window.location.hash)
    };
  }

  componentDidMount() {
    window.addEventListener('hashchange', () => {
      this.setState({ route: parseRoute(window.location.hash) });
    });
  }

  renderPage() {
    const { route } = this.state;
    if (route.path === '') {
      return <Home />;
    }
    return <NotFound />;
  }

  render() {
    return (
      <div className="container">
        <Navbar />
        { this.renderPage() }
      </div>
    );
  }
}
