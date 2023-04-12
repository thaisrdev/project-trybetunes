import React, { Component } from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

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

  removeTracks = (songs) => {
    this.setState({ isLoading: true }, async () => {
      await removeSong(songs);
      await this.getFavoritesList();
      this.setState({ isLoading: false });
    });
  };

  render() {
    const { isLoading, tracklist } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header />
        { isLoading ? <Loading /> : (tracklist.map((element) => (
          <MusicCard
            key={ element.trackId }
            trackName={ element.trackName }
            artist={ element.artist }
            previewUrl={ element.previewUrl }
            trackId={ element.trackId }
            songs={ element }
            tracklist={ tracklist }
            remove={ this.removeTracks }
          />
        ))) }
      </div>
    );
  }
}

export default Favorites;
