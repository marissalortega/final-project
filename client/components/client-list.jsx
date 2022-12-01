import React from 'react';

class Client extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clientClicked: false
    };
    this.handleClientClick = this.handleClientClick.bind(this);
  }

  handleClientClick(event) {
    this.setState({ clientClicked: true });
    this.props.setStateOfParent(this.props.client.firstName, this.props.client.lastName, this.props.client.email, this.props.client.phoneNumber, this.props.client.streetAddress, this.props.client.city, this.props.client.state, this.props.client.zipCode, this.props.client.birthday, this.state.clientClicked);
  }

  render() {
    return (
      <div>
        <li className="client-list-li" onClick={this.handleClientClick}>
          <span className="client-list-firstname">{this.props.client.firstName}</span>
          <span>{this.props.client.lastName}</span>
        </li>

      </div>
    );
  }
}

export default class ClientList extends React.Component {
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
      clientClicked: false
    };
    this.handleGoBack = this.handleGoBack.bind(this);
  }

  setStateOfParent = (firstName, lastName, email, phoneNumber, streetAddress, city, state, zipCode, birthday, clientClicked) => {
    this.setState({
      firstName,
      lastName,
      email,
      phoneNumber,
      streetAddress,
      city,
      state,
      zipCode,
      birthday,
      clientClicked,
      goBackClicked: false,
      isAddClient: false
    });
  };

  handleGoBack() {
    this.setState({
      goBackClicked: !this.state.goBackClicked,
      clientClicked: !this.state.clientClicked
    });
  }

  render() {
    this.props.clients.sort((a, b) => (a.firstName > b.firstName) ? 1 : -1);

    return (
      <div>
        {this.state.clientClicked === false &&
          <ul className="client-list">
            {
              this.props.clients.map(client => {
                return <Client key={client.clientId} client={client} setStateOfParent = {this.setStateOfParent} />;
              })
            }
          </ul>
        }
        {this.state.clientClicked === true &&
          <div>
            <div className="mr-auto" onClick={this.handleGoBack}>
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
            <div className="col-10 mx-auto">
              <div className="font-weight-700 client-card-name mb-1">
                <span className="client-card-mr">{this.state.firstName}</span>
                <span>{this.state.lastName}</span>
              </div>
              <div className="marb-4px">{this.state.email}</div>
              <div className="marb-4px">{this.state.phoneNumber}</div>
              <div>
                <div className="marb-4px">{this.state.streetAddress}</div>
                <div className="marb-4px">
                  <span className="client-card-mr">{this.state.city},</span>
                  <span className="client-card-mr">{this.state.state}</span>
                  <span className="client-card-mr">{this.state.zipCode}</span>
                </div>
                <div className="marb-4px">{this.state.birthday}</div>
              </div>
            </div>
          </div>
        }
      </div>
    );
  }
}

// class ClientCard extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       goBackClicked: false,
//       chosenClient: this.props.chosenClient
//     };
//     this.handleGoBack = this.handleGoBack.bind(this);
//   }

//   handleGoBack() {
//     console.log('click!!!');
//     this.setState({ goBackClicked: !this.state.goBackClicked });
//     console.log('this.props.addClient:', this.props.addClient);
//   }

//   render() {
//     console.log('client card this.props:', this.state.chosenClient);

//     return (
//       <div>
//         <div className="mr-auto" onClick={this.handleGoBack}>
//           <i className="fa-solid fa-chevron-left fa-l" />
//         </div>

//       </div>
//     );
//   }
// }
