import React, { useState, useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';
import AppContext from '../context/AppContext';

function Header() {
  const { setSearchInput } = useContext(AppContext);

  // console.log(useContext, 'header');

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
    if (
      location.pathname === '/profile'
      || location.pathname === '/done-recipes'
      || location.pathname === '/favorite-recipes'
    ) {
      setIsRender(false);
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
    <div className="div-header">

      {/* Há umas inconstâncias neste funcionamento */}
      {/* <a href="/profile">
        <img src={ profileIcon } alt="profile" data-testid="profile-top-btn" />
      </a> */}
      <div className="div-button-search">
        {isRender && (
          <button type="button" onClick={ handleShowInput }>
            <img data-testid="search-top-btn" src={ searchIcon } alt="search" />
          </button>
        )}
      </div>
      {showSearchInput && (
        <input
          type="text"
          data-testid="search-input"
          onChange={ ({ target }) => setSearchInput(target.value) }
        />
      )}
      {/* <img src={ searchIcon } alt="search" data-testid="search-top-btn" /> */}

      <h1 className="title-meals" data-testid="page-title">{title}</h1>

      <SearchBar />
    </div>
  );
}

export default Header;
