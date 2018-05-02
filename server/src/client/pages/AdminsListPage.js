import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchAdmins } from '../actions';
import requireAuth from '../components/hocs/requireAuth';

class AdminsList extends Component {
  // Still need to use this for client-side rendering. Need loadData for server-side rendering
  componentDidMount() {
    this.props.fetchAdmins();
  }

  renderAdmins() {
    return this.props.admins.map(admin => {
      return <li key={admin.id}>{admin.name}</li>;
    });
  }

  render() {
    return (
      <div>
        <h3>Protected list of admins:</h3>
        <ul>{this.renderAdmins()}</ul>
      </div>
    );
  }
}

const mapStateToProps = ({ admins }) => {
  return { admins };
};

// Need this because we need to get data before we render application (from server)
// thus we can't use the connect helper. Which only works through communication with provider (which must be rendered)
const loadData = ({ dispatch }) => {
  return dispatch(fetchAdmins());
};

export default {
  loadData,
  component: connect(mapStateToProps, { fetchAdmins })(requireAuth(AdminsList))
};
