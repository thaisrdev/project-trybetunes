import React, { Component } from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Favorites extends Component {
  state = {
    isLoading: false,
    tracklist: [],
  };

  componentDidMount() {
    this.getFavoritesList();
  }

  getFavoritesList = async () => {
    this.setState({ isLoading: true });
    const favoritesList = await getFavoriteSongs();
    this.setState({ tracklist: favoritesList, isLoading: false });
  };

  render() {
    const { isLoading, tracklist } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header />
        { isLoading ? <Loading /> : (
          tracklist.map((element) => (
            <MusicCard
              key={ element.trackId }
              trackName={ element.trackName }
              artist={ element.artist }
              previewUrl={ element.previewUrl }
              remove={ this.removeSongFromList }
            />
          ))
        )}
      </div>
    );
  }
}

export default Favorites;
