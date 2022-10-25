import React from 'react';

export default class AuthForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    // console.log('clicked!');
    event.preventDefault();
    const { action } = this.props;
    const req = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state)
    };
    fetch(`/api/auth/${action}`, req)
      .then(res => res.json())
      .then(result => {
        if (action === 'register') {
          window.location.hash = 'sign-in';
        } else if (result.email && result.token) {
          this.props.onSignIn(result);
        }
      });
  }

  render() {
    const { action } = this.props;
    const { handleChange, handleSubmit } = this;
    const alternateActionHref = action === 'register'
      ? '#sign-in'
      : '#register';
    const alternateActionText = action === 'register'
      ? 'Sign In'
      : 'Register';
    const submitButtonText = action === 'register'
      ? 'Register'
      : 'Sign In';
    return (
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input
            required
            autoFocus
            id="email"
            type="text"
            name="email"
            placeholder="Email"
            onChange={handleChange} />
        </div>
        <div className="mb-3">
          <input
            required
            id="password"
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange} />
        </div>
        <div>
          <a className="button" href={ alternateActionHref }>
            { alternateActionText }
          </a>
          <button type="submit">
            { submitButtonText }
          </button>
        </div>
      </form>
    );
  }
}
