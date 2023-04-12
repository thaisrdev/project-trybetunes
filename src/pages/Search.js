import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends Component {
  state = {
    isButtonDisabled: true,
    artist: '',
    isLoading: false,
    albuns: null,
    notFound: false,
    savedArtist: '',
  };

  onInputChange = (event) => {
    const { value } = event.target;
    const MIN_LENGTH = 2;
    if (value.length >= MIN_LENGTH) {
      this.setState({
        artist: value,
        isButtonDisabled: false,
        savedArtist: value,
      });
    } else {
      this.setState({
        artist: value,
        isButtonDisabled: true,
        savedArtist: value,
      });
    }
  };

  handleClick = async () => {
    const { artist } = this.state;
    this.setState({ isLoading: true });
    const results = await searchAlbumsAPI(artist);
    if (results.length === 0) {
      this.setState({ notFound: true });
    }
    this.setState({
      albuns: results,
      isLoading: false,
      artist: '',
    });
  };

  render() {
    const {
      isButtonDisabled,
      artist,
      isLoading,
      albuns,
      notFound,
      savedArtist,
    } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        { isLoading ? <Loading />
          : (
            <section>
              <form>
                <div>
                  <input
                    value={ artist }
                    name="artist"
                    data-testid="search-artist-input"
                    type="text"
                    onChange={ this.onInputChange }
                  />
                  <button
                    type="button"
                    data-testid="search-artist-button"
                    disabled={ isButtonDisabled }
                    onClick={ this.handleClick }
                  >
                    Pesquisar

                  </button>
                </div>
              </form>
            </section>
          )}
        { albuns ? (
          <div>
            <p>
              Resultado de álbuns de:
              {' '}
              {savedArtist}
            </p>
            { albuns.map((element) => (
              <section
                key={ element.collectionName }
              >
                <h3>{ element.collectionName }</h3>
                <Link
                  to={ `/album/${element.collectionId}` }
                  data-testid={ `link-to-album-${element.collectionId}` }
                >
                  Link

                </Link>
              </section>
            ))}
          </div>) : ''}
        {notFound && <p>Nenhum álbum foi encontrado</p> }
      </div>
    );
  }
}
export default Search;
