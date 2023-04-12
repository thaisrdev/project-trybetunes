import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';
import Loading from '../components/Loading';

class Profile extends Component {
  state = {
    isLoading: false,
    profileData: {},
  };

  componentDidMount() {
    this.getProfileData();
  }

  getProfileData = async () => {
    this.setState({ isLoading: true });
    const userData = await getUser();
    this.setState({ isLoading: false, profileData: userData });
  };

  render() {
    const {
      isLoading,
      profileData,
    } = this.state;
    const {
      name,
      image,
      email,
      description,
    } = profileData;
    return (
      <div data-testid="page-profile">
        <Header />
        { isLoading ? <Loading /> : (
          <div>
            <h3>{name}</h3>
            <img
              data-testid="profile-image"
              alt="user-profile"
              src={ image }
            />
            <h4>{email}</h4>
            <p>{description}</p>

            <Link to="/profile/edit">
              <button type="button">
                Editar perfil
              </button>
            </Link>

          </div>
        )}

      </div>
    );
  }
}

export default Profile;
