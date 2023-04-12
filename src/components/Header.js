import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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
        <Link to="/search" data-testid="link-to-search"> Search </Link>
        <Link to="/favorites" data-testid="link-to-favorites"> Favorites </Link>
        <Link to="/profile" data-testid="link-to-profile"> Profile </Link>
        { isLoading ? <Loading /> : <h2 data-testid="header-user-name">{userName}</h2> }
      </div>
    );
  }
}

export default Header;
