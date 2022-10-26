import React, { useContext, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import AppContext from '../context/AppContext';

function SearchBar() {
  const { dataDrinks, dataMeals,
    requestDrinksAPI, requestMealsAPI, searchInput } = useContext(AppContext);

  const [radioButton, setradioButton] = useState('');

  const location = useLocation();

  const handleClick = () => {
    if (location.pathname === '/drinks') {
      if (radioButton === 'i') {
        requestDrinksAPI(radioButton, searchInput, 'filter');
      } else {
        requestDrinksAPI(radioButton, searchInput, 'search');
      }
    } else if (location.pathname === '/meals') {
      if (radioButton === 'i') {
        requestMealsAPI(radioButton, searchInput, 'filter');
      } else {
        requestMealsAPI(radioButton, searchInput, 'search');
      }
    }
  };

  useEffect(() => {
    if (searchInput.length > 1 && radioButton === 'f') {
      global.alert('Your search must have only 1 (one) character');
    }
  }, [searchInput]);

  return (
    <form>
      <div>
        <input
          type="radio"
          value="i"
          name="search"
          data-testid="ingredient-search-radio"
          onChange={ ({ target }) => setradioButton(target.value) }
        />
        ingrediente
        <input
          type="radio"
          value="s"
          name="search"
          data-testid="name-search-radio"
          onChange={ ({ target }) => setradioButton(target.value) }
        />
        nome
        <input
          type="radio"
          value="f"
          name="search"
          data-testid="first-letter-search-radio"
          onChange={ ({ target }) => setradioButton(target.value) }
        />
        primeira letra
      </div>
      <button type="button" data-testid="exec-search-btn" onClick={ handleClick }>
        Pesquisar
      </button>
    </form>
  );
}

export default SearchBar;
