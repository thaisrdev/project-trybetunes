import React, { Component } from 'react';
import Header from '../components/Header';

class Search extends Component {
  state = {
    isButtonDisabled: true,
    text: '',
  };

  onInputChange = (event) => {
    const { value } = event.target;
    const MIN_LENGTH = 2;
    if (value.length >= MIN_LENGTH) {
      this.setState({
        text: value,
        isButtonDisabled: false,
      });
    } else {
      this.setState({
        text: value,
        isButtonDisabled: true,
      });
    }
  };

  render() {
    const { isButtonDisabled, text } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <input
            value={ text }
            name="text"
            data-testid="search-artist-input"
            type="text"
            onChange={ this.onInputChange }
          />
          <button
            type="submit"
            data-testid="search-artist-button"
            disabled={ isButtonDisabled }
          >
            Pesquisar

          </button>
        </form>
      </div>
    );
  }
}
export default Search;
