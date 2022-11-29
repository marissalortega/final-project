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
      clientClicked
    });
  };

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
            <i className="fa-solid fa-chevron-left fa-l" />
            <p>{this.state.firstName}</p>
            <p>{this.state.lastName}</p>
            <p>{this.state.email}</p>
            <p>{this.state.phoneNumber}</p>
            <p>{this.state.streetAddress}</p>
            <p>{this.state.city}</p>
            <p>{this.state.state}</p>
            <p>{this.state.zipCode}</p>
            <p>{this.state.birthday}</p>
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
