import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from '../components/Loading';

class Login extends Component {
  state = {
    userName: '',
    isSaveButtonDisabled: true,
    isLoading: false,
    isRedirected: false,
  };

  onInputChange = (event) => {
    const { value } = event.target;
    const MIN_LENGTH = 3;
    if (value.length >= MIN_LENGTH) {
      this.setState({
        userName: value,
        isSaveButtonDisabled: false,
      });
    } else {
      this.setState({
        userName: value,
        isSaveButtonDisabled: true,
      });
    }
  };

  handleClick = () => {
    const { userName } = this.state;
    this.setState({ isLoading: true });
    createUser({ name: userName })
      .then(() => {
        this.setState({
          isLoading: false,
          isRedirected: true });
      });
  };

  render() {
    const {
      userName,
      isSaveButtonDisabled,
      isLoading,
      isRedirected,
    } = this.state;

    return (
      <div data-testid="page-login">
        { isLoading ? <Loading /> : (
          <form>
            <input
              data-testid="login-name-input"
              type="text"
              value={ userName }
              onChange={ this.onInputChange }
              name="userName"
            />
            <button
              type="submit"
              data-testid="login-submit-button"
              disabled={ isSaveButtonDisabled }
              onClick={ this.handleClick }
            >
              Entrar
            </button>
          </form>
        ) }
        { isRedirected ? <Redirect to="/search" /> : null }
      </div>
    );
  }
}
export default Login;
