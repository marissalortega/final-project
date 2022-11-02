import AppContext from '../lib/app-context';
import React from 'react';

export default class Redirect extends React.Component {
  render() {
    const props = this.props;
    const url = new URL(window.location);
    if (props.to === '') {
      url.hash = '#';
    } else {
      url.hash = props.to;
    }
    window.location.replace(url);
    return null;
  }
}

Redirect.contextType = AppContext;
