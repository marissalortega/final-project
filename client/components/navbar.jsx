import AppContext from '../lib/app-context';
import React from 'react';

export default class Navbar extends React.Component {
  render() {
    return (
      <nav className="navbar row">
        <div className="container">
          <a className="navbar-brand" href="#">
            NavBar
          </a>
          <div>
            <a href="#schedule">
              Schedule
            </a>
            <a href="#clients">
              Clients
            </a>
            <a href="#communication">
              Communication
            </a>
          </div>
          <div>
            { }
          </div>
        </div>
        <div />
      </nav>
    );
  }
}

Navbar.contextType = AppContext;
