
import React from 'react';
import AddClientForm from '../components/add-client-form';
import ClientList from '../components/client-list';

export default class ClientsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAddClient: false,
      clients: [],
      clientClicked: false
    };
    this.handleAddClient = this.handleAddClient.bind(this);
  }

  componentDidMount() {
    const fetchConfig = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-Access-Token': localStorage.getItem('jwt')
      }
    };
    fetch('/api/add-client', fetchConfig)
      .then(res => {
        return res.json();
      })
      .then(clients => {
        this.setState({ clients });
      })
      .catch(err => console.error('Fetch failed!', err));
  }

  handleAddClient() {
    this.setState({ isAddClient: !this.state.isAddClient });
  }

  setStateOfIsAddClient = newStatus => {
    this.setState({ isAddClient: newStatus });
  };

  render() {
    return (
      <div className="mt-3">
        <h1>Clients</h1>
        <div>
          { this.state.isAddClient === false && this.state.clientClicked === false &&
            <div className="d-flex justify-content-end mb-3">
              <i className="fa-solid fa-user-plus" onClick={this.handleAddClient} />
            </div>
            }

          { this.state.isAddClient === true &&
            <div>
              <AddClientForm setStateOfIsAddClient={this.setStateOfIsAddClient} />
            </div>
          }
        </div>
        { this.state.isAddClient === false &&
          <div>
            <ClientList clients={this.state.clients} />
          </div>
        }
      </div>
    );
  }
}
