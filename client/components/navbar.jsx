import AppContext from '../lib/app-context';
import React from 'react';

export default class Navbar extends React.Component {
  render() {
    return (
      <nav className="navbar">
        <div className="container">
          <a className="navbar-brand" href="#">
            NavBar
          </a>
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
        <div />
      </nav>
    );
  }
}

Navbar.contextType = AppContext;
