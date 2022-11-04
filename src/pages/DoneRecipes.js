import React, { useEffect, useState } from 'react';
import Header from '../components/Header';

function DoneRecipes() {
  const [recipes, setRecipes] = useState([]);

  const getLocalStorageRecipes = () => {
    const showDoneRecipes = JSON.parse(localStorage.getItem('doneRecipes')) || [];
    setRecipes(showDoneRecipes);
  };

  useEffect(() => {
    getLocalStorageRecipes();
  }, []);

  return (
    <div>
      <Header />
      <button type="button" data-testid="filter-by-all-btn">
        All
      </button>
      <button type="button" data-testid="filter-by-meal-btn">
        Meals
      </button>
      <button type="button" data-testid="filter-by-drink-btn">
        Drinks
      </button>
      {recipes.map((obj, i) => (
        <div key={ i }>
          <img
            src={ obj.image }
            alt="imagem"
            data-testid={ `${i}-horizontal-image` }
          />
          <p data-testid={ `${i}-horizontal-top-text` }>{obj.category}</p>
          <p data-testid={ `${i}-horizontal-name` }>{obj.name}</p>
          <p data-testid={ `${i}-horizontal-done-date` }>{obj.doneDate}</p>
          {obj.tags.map((el) => (
            <p key={ i } data-testid={ `${i}-${el}-horizontal-tag` }>
              {el}
            </p>
          ))}
          <button type="button" data-testid={ `${i}-horizontal-share-btn` }>
            compartilhar
          </button>
        </div>
      ))}
    </div>
  );
}

export default DoneRecipes;
