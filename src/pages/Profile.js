import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

function Profile() {
  const handleClick = () => {
    localStorage.clear();
  };

  return (
    <div>
      <Header />
      <h3 data-testid="profile-email">{localStorage.getItem('user')}</h3>
      <Link to="/done-recipes">
        <button type="button" data-testid="profile-done-btn">
          Done Recipes

        </button>
      </Link>
      <Link to="/favorite-recipes">
        <button type="button" data-testid="profile-favorite-btn">
          Favorite Recipes

        </button>
      </Link>
      <Link exact to="/">
        <button
          type="button"
          data-testid="profile-logout-btn"
          onClick={ handleClick }
        >
          Logout

        </button>
      </Link>
      <Footer />
    </div>
  );
}

export default Profile;
