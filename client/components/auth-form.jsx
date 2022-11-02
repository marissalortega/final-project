import React from 'react';

export default class AuthForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleSubmit(event) {
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
        } else if (result.user && result.token) {
          this.props.onSignIn(result);
        }
      });
  }

  handlePasswordChange(event) {
    this.setState({ password: event.target.value });
  }

  render() {
    const { action } = this.props;
    const { handleChange, handleSubmit, handleClick } = this;
    const alternateActionHref = action === 'register'
      ? '#sign-in'
      : '#register';
    const alternateActionText = action === 'register'
      ? 'Sign in'
      : 'Register';
    const submitButtonText = action === 'register'
      ? 'Register'
      : 'Sign In';

    const passwordLength = this.state.password.length;
    let errorMsg = '';
    let iconClass = '';
    let pwdErrDivClass = 'pwd-err-div';

    if (passwordLength === 0) {
      pwdErrDivClass = 'pwd-err-div hidden';
    } else if (passwordLength > 0 && passwordLength < 8) {
      pwdErrDivClass = 'pwd-err-div show-div';
      errorMsg = 'Your password is too short.';
      iconClass = 'fa-solid fa-xmark fa-l red';
    } else {
      pwdErrDivClass = 'pwd-err-div show-div';
      errorMsg = 'Your password meets requirements.';
      iconClass = 'fa-solid fa-check fa-l green';
    }

    return (
      <div className="d-flex justify-content-center">
        <form className="col-10 col-sm-7 col-md-5 col-lg-4" onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              required
              autoFocus
              id="email"
              type="text"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              className="form-control border-dark" />
          </div>
          <div className="mb-1">
            <input
              required
              id="password"
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              onClick={handleClick}
              className="form-control border-dark" />
          </div>
          { action === 'register' &&
            <div className={pwdErrDivClass}>
              <i className={iconClass} />
              <p className="pwd-err-msg">{errorMsg}</p>
            </div>
          }
          <div className="mt-4 mb-2 d-grid gap-2">
            <button className="border-dark rounded" type="submit">
              { submitButtonText }
            </button>
          </div>
          <div className="click-here-text text-center">
            <span>Click here to </span>
            <a href={alternateActionHref}>
              {alternateActionText}
            </a>
          </div>
        </form>
      </div>
    );
  }
}
