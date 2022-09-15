import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

class Album extends React.Component {
  state = {
    artist: '',
    album: '',
    tracks: [],
  };

  componentDidMount() {
    this.listMusic();
  }

  listMusic = async () => {
    const { match: { params: { id } } } = this.props;
    // HELEN RIBAS ME AJUDOU
    console.log(this.props); // coloca antes pra ver o objeto?
    const music = await getMusics(id);
    console.log(music);
    this.setState({
      artist: music[0].artistName,
      album: music[0].collectionName,
      tracks: music.slice(1) });
  };

  render() {
    const { artist, album, tracks } = this.state;
    return (

      <div data-testid="page-album">
        <Header />
        <p data-testid="artist-name">{ artist}</p>
        <p data-testid="album-name">{ album }</p>
        { tracks.map((element) => (
          <MusicCard
            key={ element.trackId }
            trackName={ element.trackName }
            previewUrl={ element.previewUrl }
            trackId={ element.trackId }
            songs={ element }
          />
        ))}

      </div>

    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({ id: PropTypes.string.isRequired }).isRequired }).isRequired,
};

export default Album;
