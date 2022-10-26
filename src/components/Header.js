import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header() {
  const location = useLocation();
  const [isRender, setIsRender] = useState(true);
  const [title, setTitle] = useState('');
  const [showSearchInput, setShowSearchInput] = useState(false);

  const pathTitle = () => {
    switch (location.pathname) {
    case '/meals':
      setTitle('Meals');
      break;
    case '/drinks':
      setTitle('Drinks');
      break;
    case '/profile':
      setTitle('Profile');
      break;
    case '/done-recipes':
      setTitle('Done Recipes');
      break;
    case '/favorite-recipes':
      setTitle('Favorite Recipes');
      break;
    default:
      setTitle('');
    }
  };

  useEffect(() => {
    if (location.pathname === '/profile'
      || location.pathname === '/done-recipes'
      || location.pathname === '/favorite-recipes') {
      setIsRender(false);
      console.log(isRender);
    }
    pathTitle();
  }, []);

  const handleShowInput = () => {
    setShowSearchInput(!showSearchInput);
  };

  /* if (location.pathname === '/meals') {
    setIsRender(false);
    console.log(isRender);
  } */

  return (
    <div>
      <a href="/profile">
        <img
          src={ profileIcon }
          alt="profile"
          data-testid="profile-top-btn"
        />
      </a>
      <div>
        { isRender && (
          <button type="button" onClick={ handleShowInput }>
            <img
              data-testid="search-top-btn"
              src={ searchIcon }
              alt="search"
            />
          </button>)}

      </div>
      {showSearchInput && <input type="text" data-testid="search-input" />}
      {/* <img src={ searchIcon } alt="search" data-testid="search-top-btn" /> */}

      <h1 data-testid="page-title">{title}</h1>
    </div>
  );
}

export default Header;
