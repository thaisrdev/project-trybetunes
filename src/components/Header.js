import React, { Component } from 'react';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends Component {
  state = {
    isLoading: true,
    userName: '',
  };

  componentDidMount() {
    getUser()
      .then(({ name }) => {
        this.setState({
          isLoading: false,
          userName: name });
      });
  }

  render() {
    const { isLoading, userName } = this.state;
    return (
      <div>
        <header data-testid="header-component" />
        { isLoading ? <Loading /> : <h2 data-testid="header-user-name">{userName}</h2> }

      </div>
    );
  }
}

export default Header;
