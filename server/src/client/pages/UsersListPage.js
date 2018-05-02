import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';

import { fetchUsers } from '../actions';

class UsersList extends Component {
  // Still need to use this for client-side rendering. Need loadData for server-side rendering
  componentDidMount() {
    this.props.fetchUsers();
  }

  renderUsers() {
    return this.props.users.map(user => {
      return <li key={user.id}>{user.name}</li>;
    });
  }

  head() {
    return (
      <Helmet>
        <title>{`${this.props.users.length} Users Loaded`}</title>
        <meta property="og:title" content="Users App" />
      </Helmet>
    );
  }

  render() {
    return (
      <div>
        {this.head()}
        Here's a big list of users:
        <ul>{this.renderUsers()}</ul>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { users: state.users };
};

// Need this because we need to get data before we render application (from server)
// thus we can't use the connect helper. Which only works through communication with provider (which must be rendered)
const loadData = ({ dispatch }) => {
  return dispatch(fetchUsers());
};

export default {
  loadData,
  component: connect(mapStateToProps, { fetchUsers })(UsersList)
};
