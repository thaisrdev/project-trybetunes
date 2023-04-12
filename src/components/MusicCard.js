import React from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends React.Component {
  state = {
    isChecked: false,
    isLoading: false,
  };

  componentDidMount() {
    this.favoriteList();
  }

  favoriteList = async () => {
    const { trackId } = this.props;
    this.setState({ isLoading: true });
    const getFavorites = await getFavoriteSongs();
    const verify = getFavorites.some((element) => element.trackId === trackId);
    this.setState({ isLoading: false, isChecked: verify });
  };

  addSongs = (event) => {
    const { checked } = event.target;
    this.setState({ isChecked: checked, isLoading: true }, async () => {
      const { songs } = this.props;
      await addSong(songs);
      this.setState({ isLoading: false });
    });
  };

  // removeSongs = () => {
  //   this.setState({ isLoading: true }, async () => {
  //     const { songs } = this.props;
  //     await removeSong(songs);
  //     this.setState({ isLoading: false, isChecked: false });
  //   });
  // };

  removeSongs = () => {
    this.setState({ isLoading: true }, async () => {
      const { songs, remove } = this.props;
      console.log(remove);
      await remove(songs);
      this.setState({ isLoading: false, isChecked: false });
    });
  };

  render() {
    const {
      trackName,
      previewUrl,
      trackId,
    } = this.props;
    const {
      isChecked,
      isLoading,
    } = this.state;
    return (
      <div>
        {
          isLoading
            ? <Loading />
            : (
              <span>
                <p>{trackName}</p>
                <audio data-testid="audio-component" src={ previewUrl } controls>
                  <track kind="captions" />
                  O seu navegador não suporta o elemento
                  {' '}
                  {' '}
                  <code>audio</code>
                  .
                </audio>
                <label htmlFor={ trackId }>
                  {' '}
                  Favorita
                  <input
                    type="checkbox"
                    data-testid={ `checkbox-music-${trackId}` }
                    checked={ isChecked }
                    id={ trackId }
                    onChange={ !isChecked ? this.addSongs : this.removeSongs }
                  />

                </label>
              </span>
            )
        }
      </div>
    );
  }
}

MusicCard.propTypes = {
  previewUrl: PropTypes.string.isRequired,
  trackName: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  songs: PropTypes.shape({}).isRequired,
  remove: PropTypes.func.isRequired,
};

export default MusicCard;
