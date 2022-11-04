
import React from 'react';
import AddClientForm from '../components/add-client-form';

export default class ClientsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clients: [],
      isAddClient: false
    };
    this.handleAddClient = this.handleAddClient.bind(this);
  }

  handleAddClient() {
    this.setState({ isAddClient: !this.state.isAddClient });
  }

  // componentDidMount() {
  //   const fetchConfig = {
  //     method: 'GET',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'X-Access-Token': localStorage.getItem('jwt')
  //     }
  //   };
  //   fetch('/api/add-client', fetchConfig)
  //     .then(res => {
  //       console.log('res:', res.json());
  //       res.json();
  //     })
  //     .then(clients => {
  //       console.log('clients:', clients);
  //       // this.setState({ clients });
  //     })
  //     .catch(err => console.error('Fetch failed!', err));
  // }

  render() {
    // console.log('this.state:', this.state);
    return (
      <div className="mt-3">
        <h1>Clients</h1>
        <div>
          { this.state.isAddClient === false &&
            <div className="d-flex justify-content-end mb-3">
              <i className="fa-solid fa-user-plus" onClick={this.handleAddClient} />
            </div>
            }

          { this.state.isAddClient === true &&
            <div>
              <AddClientForm />
            </div>
          }
        </div>
      </div>
    );
  }
}
