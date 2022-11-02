import AppContext from '../lib/app-context';
import React from 'react';

export default class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isClicked: false
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState({ isClicked: !this.state.isClicked });
  }

  render() {
    const { user, route, handleSignOut } = this.context;
    const alternateActionHref = route.path === 'register'
      ? '#sign-in'
      : '#register';
    const alternateActionText = route.path === 'register'
      ? 'Sign in'
      : 'Register';
    const showMenu = 'nav-menu show-menu';
    const hideMenu = 'nav-menu hidden-menu';
    return (
      <nav className="navbar row">
        <div className="container col-lg-11 col-xl-10">
          <div className="d-flex align-items-center">
            <div className="hide-on-desktop">
              { user !== null &&
                <div className="d-inline-block" onClick={this.handleClick}>
                  <i className="fa-solid fa-bars fa-lg" />
                </div>
              }
            </div>
            <div className="d-inline-block">
              <a className="logo" href="#">
                <h2>NavBar</h2>
              </a>
            </div>
            { user !== null &&
              <div className="hide-on-mobile desktop-nav">
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
            }
          </div>
          { this.state.isClicked === false &&
            <div className={hideMenu}>
              <div className="list-group rounded-0">
                <a href="#schedule" className="list-group-item list-group-item-action border-0">
                  Schedule
                </a>
                <a href="#clients" className="list-group-item list-group-item-action border-0">
                  Clients
                </a>
                <a href="#communication" className="list-group-item list-group-item-action border-0">
                  Communication
                </a>
              </div>
            </div>
          }
          {this.state.isClicked === true &&
            <div className="white-bg">
              <ul className={showMenu}>
                <a href="#schedule" onClick={this.handleClick}>
                  <li>
                    Schedule
                  </li>
                </a>
                <a href="#clients" onClick={this.handleClick}>
                  <li>
                    Clients
                  </li>
                </a>
                <a href="#communication" onClick={this.handleClick}>
                  <li>
                    Communication
                  </li>
                </a>
              </ul>
            </div>
          }
          <div>
            { user !== null &&
              <button className="btn btn-dark" onClick={handleSignOut}>
                Sign Out
              </button>
            }
            { user === null &&
              <a href={alternateActionHref} className="btn btn-sm btn-dark">
                {alternateActionText}
                </a>
            }
          </div>
        </div>
        <div />
      </nav>
    );
  }
}

Navbar.contextType = AppContext;
