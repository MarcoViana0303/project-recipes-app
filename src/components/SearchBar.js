import React, { useContext, useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import AppContext from '../context/AppContext';

function SearchBar() {
  const {
    requestDrinksAPI,
    requestMealsAPI,
    setHandleControl,
    searchInput,
    dataDrinks,
    dataMeals,
  } = useContext(AppContext);

  const [radioButton, setradioButton] = useState('');

  const location = useLocation();
  const history = useHistory();

  const handleClick = () => {
    if (location.pathname === '/drinks') {
      if (radioButton === 'i') {
        requestDrinksAPI(radioButton, searchInput, 'filter');
      } else {
        requestDrinksAPI(radioButton, searchInput, 'search');
      }
    } else if (radioButton === 'i') {
      requestMealsAPI(radioButton, searchInput, 'filter');
    } else {
      requestMealsAPI(radioButton, searchInput, 'search');
    }
  };

  const pathDetails = () => {
    const { drinks } = dataDrinks;
    const { meals } = dataMeals;
    if (location.pathname.includes('/drinks') && drinks.length === 1) {
      const id = drinks[0].idDrink;
      history.push(`/drinks/${id}`);
    } else if (location.pathname.includes('/meals') && meals.length === 1) {
      const id = meals[0].idMeal;
      history.push(`/meals/${id}`);
    }
    setHandleControl(true);
  };

  const checkIsTrue = () => {
    const { drinks } = dataDrinks;
    const { meals } = dataMeals;
    if (!drinks || !meals) {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
      return;
    }
    if (drinks || meals) {
      pathDetails();
    }
  };

  useEffect(() => {
    checkIsTrue();
  }, [dataMeals, dataDrinks]);

  useEffect(() => {
    if (searchInput.length > 1 && radioButton === 'f') {
      global.alert('Your search must have only 1 (one) character');
    }
  }, [searchInput]);

  return (
    <form>
      <div>
        <label htmlFor="ingrediente">
          <input
            type="radio"
            value="i"
            id="ingrediente"
            name="search"
            data-testid="ingredient-search-radio"
            onChange={ ({ target }) => setradioButton(target.value) }
          />
          ingrediente
        </label>
        <label htmlFor="nome">
          <input
            type="radio"
            id="nome"
            value="s"
            name="search"
            data-testid="name-search-radio"
            onChange={ ({ target }) => setradioButton(target.value) }
          />
          nome
        </label>
        <label htmlFor="letter">
          <input
            type="radio"
            value="f"
            id="letter"
            name="search"
            data-testid="first-letter-search-radio"
            onChange={ ({ target }) => setradioButton(target.value) }
          />
          primeira letra
        </label>
      </div>
      <button type="button" data-testid="exec-search-btn" onClick={ handleClick }>
        Pesquisar
      </button>
    </form>
  );
}

export default SearchBar;
