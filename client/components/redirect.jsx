import AppContext from '../lib/app-context';

export default function Redirect(props) {
  const url = new URL(window.location);
  if (props.to === '') {
    url.hash = '#';
  } else {
    url.hash = props.to;
  }
  window.location.replace(url);
  return null;
}

Redirect.contextType = AppContext;
