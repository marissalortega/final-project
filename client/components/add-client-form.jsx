import React from 'react';

export default class AddClientForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      streetAddress: '',
      city: '',
      state: '',
      zipCode: '',
      birthday: '',
      goBackClicked: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleGoBack = this.handleGoBack.bind(this);
  }

  handleGoBack() {
    this.setState({ goBackClicked: !this.state.goBackClicked });
    this.props.setStateOfIsAddClient(false);
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const req = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Access-Token': localStorage.getItem('jwt')
      },
      body: JSON.stringify(this.state)
    };
    fetch('/api/add-client', req)
      .then(res => {
        return res.json();
      })
      .then(result => {

      })
      .catch(err => console.error('Fetch failed!', err));
  }

  render() {
    const { handleChange, handleSubmit, handleGoBack } = this;
    let hiddenClass = '';

    if (this.state.goBackClicked === true) {
      hiddenClass = 'hidden';
    }

    return (
      <div className={hiddenClass}>
        <div className="mr-auto" onClick={handleGoBack}>
          <i className="fa-solid fa-chevron-left fa-l" />
        </div>
        <div className="d-flex justify-content-center mb-3">
          <div className="upload-image col-10 rounded-top d-flex justify-content-center align-items-center flex-column">
            <p className="mb-0">Add Photo</p>
            <div>
              <i className="fa-solid fa-plus fa-xl" />
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-center">
          <form className="col-10 col-sm-7 col-md-5 col-lg-4" onSubmit={handleSubmit}>
            <div className="mb-2">
              <label htmlFor="first-name">
                First Name
              </label>
              <input
                required
                id="first-name"
                type="text"
                name="firstName"
                onChange={handleChange}
                className="form-control border-dark" />
            </div>
            <div className="mb-2">
              <label htmlFor="last-name">
                Last Name
              </label>
              <input
                required
                id="last-name"
                type="text"
                name="lastName"
                onChange={handleChange}
                className="form-control border-dark" />
            </div>
            <div className="mb-2">
              <label htmlFor="email">
                Email Address
              </label>
              <input
                required
                id="email"
                type="email"
                name="email"
                placeholder="name@example.com"
                onChange={handleChange}
                className="form-control border-dark" />
            </div>
            <div className="mb-2">
              <label htmlFor="phone-number">
                Phone Number
              </label>
              <input
                required
                id="phone-number"
                type="tel"
                name="phoneNumber"
                placeholder="xxx-xxx-xxxx"
                pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                maxLength="12"
                onChange={handleChange}
                className="form-control border-dark" />
            </div>
            <div className="mb-2">
              <label htmlFor="street-address">
                Street Address
              </label>
              <input
                required
                id="street-address"
                type="text"
                name="streetAddress"
                onChange={handleChange}
                className="form-control border-dark" />
            </div>
            <div className="mb-2">
              <label htmlFor="city">
                City
              </label>
              <input
                required
                id="city"
                type="text"
                name="city"
                onChange={handleChange}
                className="form-control border-dark" />
            </div>
            <div className="mb-2">
              <label htmlFor="state">
                State
              </label>
              <select id="state" name="state" required onChange={handleChange} className="form-select text-muted border-dark">
                <option value="">Select One</option>
                <option value="AL">Alabama</option>
                <option value="AK">Alaska</option>
                <option value="AZ">Arizona</option>
                <option value="AR">Arkansas</option>
                <option value="CA">California</option>
                <option value="CO">Colorado</option>
                <option value="CT">Connecticut</option>
                <option value="DE">Delaware</option>
                <option value="DC">District of Columbia</option>
                <option value="FL">Florida</option>
                <option value="GA">Georgia</option>
                <option value="HI">Hawaii</option>
                <option value="ID">Idaho</option>
                <option value="IL">Illinois</option>
                <option value="IN">Indiana</option>
                <option value="IA">Iowa</option>
                <option value="KS">Kansas</option>
                <option value="KY">Kentucky</option>
                <option value="LA">Louisiana</option>
                <option value="ME">Maine</option>
                <option value="MD">Maryland</option>
                <option value="MA">Massachusetts</option>
                <option value="MI">Michigan</option>
                <option value="MN">Minnesota</option>
                <option value="MS">Mississippi</option>
                <option value="MO">Missouri</option>
                <option value="MT">Montana</option>
                <option value="NE">Nebraska</option>
                <option value="NV">Nevada</option>
                <option value="NH">New Hampshire</option>
                <option value="NJ">New Jersey</option>
                <option value="NM">New Mexico</option>
                <option value="NY">New York</option>
                <option value="NC">North Carolina</option>
                <option value="ND">North Dakota</option>
                <option value="OH">Ohio</option>
                <option value="OK">Oklahoma</option>
                <option value="OR">Oregon</option>
                <option value="PA">Pennsylvania</option>
                <option value="RI">Rhode Island</option>
                <option value="SC">South Carolina</option>
                <option value="SD">South Dakota</option>
                <option value="TN">Tennessee</option>
                <option value="TX">Texas</option>
                <option value="UT">Utah</option>
                <option value="VT">Vermont</option>
                <option value="VA">Virginia</option>
                <option value="WA">Washington</option>
                <option value="WV">West Virginia</option>
                <option value="WI">Wisconsin</option>
                <option value="WY">Wyoming</option>
              </select>
            </div>
            <div className="mb-2">
              <label htmlFor="zip-code">
                Zip Code
              </label>
              <input
                required
                id="zip-code"
                type="text"
                name="zipCode"
                maxLength="5"
                onChange={handleChange}
                className="form-control border-dark" />
            </div>
            <div className="mb-3">
              <label htmlFor="birthday">
                Birthday
              </label>
              <input
                required
                id="birthday"
                type="date"
                name="birthday"
                onChange={handleChange}
                className="form-control text-muted border-dark" />
            </div>
            <div className="mb-5">
              <input
                type="submit"
                value="Add Client"
                className="form-control border-dark" />
            </div>
          </form>
        </div>
      </div>
    );
  }
}
