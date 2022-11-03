import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import '../recipedetails.css';

const copy = require('clipboard-copy');

function FavoriteRecipes() {
  const [copyClip, setCopy] = useState(false);
  const [filterAll, setFilterAll] = useState(true);
  const [filterMeal, setFilterMeal] = useState(false);
  const [filterDrink, setFilterDrink] = useState(false);
  const [saveLocal, setSaveLocal] = useState([]);
  useEffect(() => {
    const localJSON = localStorage.getItem('favoriteRecipes');
    if (localJSON !== null) {
      const local = JSON.parse(localJSON);
      setSaveLocal(local);
    }
  }, []);
  const atualiza = (recipe) => {
    const prevFAV = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const callback = prevFAV.filter((receita) => receita.id !== recipe.id);
    localStorage.setItem('favoriteRecipes', JSON.stringify(callback));
    setSaveLocal(callback);
  };
  return (
    <div>
      {/* <Header /> */}
      <button
        type="button"
        data-testid="filter-by-all-btn"
        onClick={ () => {
          setFilterAll(true); setFilterMeal(false); setFilterDrink(false);
        } }
      >
        All
      </button>
      <button
        type="button"
        data-testid="filter-by-meal-btn"
        onClick={ () => {
          setFilterAll(false); setFilterMeal(true); setFilterDrink(false);
        } }
      >
        Meals
      </button>
      <button
        type="button"
        data-testid="filter-by-drink-btn"
        onClick={ () => {
          setFilterAll(false); setFilterMeal(false);
          setFilterDrink(true);
        } }
      >
        Drinks
      </button>
      {filterAll
        && saveLocal.map((recipe, index) => {
          if (recipe.type === 'meal') {
            return (
              <div key={ index }>
                <Link to={ `/meals/${recipe.id}` }>
                  <img
                    src={ `${recipe.image}` }
                    alt={ `Foto de ${recipe.name}` }
                    data-testid={ `${index}-horizontal-image` }
                    className="favoriteIMG"
                  />
                  <h3 data-testid={ `${index}-horizontal-name` }>{recipe.name}</h3>
                </Link>
                <p
                  data-testid={ `${index}-horizontal-top-text` }
                >
                  {`${recipe.nationality} - ${recipe.category}`}
                </p>
                <button
                  type="button"
                  onClick={ () => {
                    copy(`http://localhost:3000/${recipe.type}s/${recipe.id}`);
                    setCopy(true);
                  } }
                >
                  <img
                    data-testid={ `${index}-horizontal-share-btn` }
                    src={ shareIcon }
                    alt="icone de share"
                  />
                </button>
                <button
                  type="button"
                  onClick={ () => atualiza(recipe) }
                >
                  <img
                    data-testid={ `${index}-horizontal-favorite-btn` }
                    src={ blackHeartIcon }
                    alt="icone de heart"
                  />
                </button>
              </div>
            );
          }
          return (
            <div key={ index }>
              <Link to={ `/drinks/${recipe.id}` }>
                <img
                  src={ `${recipe.image}` }
                  alt={ `Foto de ${recipe.name}` }
                  data-testid={ `${index}-horizontal-image` }
                  className="favoriteIMG"
                />
                <h3 data-testid={ `${index}-horizontal-name` }>{recipe.name}</h3>
              </Link>
              <p
                data-testid={ `${index}-horizontal-top-text` }
              >
                {`${recipe.nationality} - ${recipe.alcoholicOrNot}`}
              </p>
              <button
                type="button"
                onClick={ () => {
                  copy(`http://localhost:3000/${recipe.type}s/${recipe.id}`);
                  setCopy(true);
                } }
              >
                <img
                  data-testid={ `${index}-horizontal-share-btn` }
                  src={ shareIcon }
                  alt="icone de share"
                />
              </button>
              <button
                type="button"
                onClick={ () => atualiza(recipe) }
              >
                <img
                  data-testid={ `${index}-horizontal-favorite-btn` }
                  src={ blackHeartIcon }
                  alt="icone de heart"
                />
              </button>
            </div>
          );
        })}
      {filterMeal
        && saveLocal.filter((recipe) => recipe.type === 'meal').map((recipe, index) => {
          if (recipe.type === 'meal') {
            return (
              <div key={ index }>
                <Link to={ `/meals/${recipe.id}` }>
                  <img
                    src={ `${recipe.image}` }
                    alt={ `Foto de ${recipe.name}` }
                    data-testid={ `${index}-horizontal-image` }
                    className="favoriteIMG"
                  />
                  <h3 data-testid={ `${index}-horizontal-name` }>{recipe.name}</h3>
                </Link>
                <p
                  data-testid={ `${index}-horizontal-top-text` }
                >
                  {`${recipe.nationality} - ${recipe.category}`}
                </p>
                <button
                  type="button"
                  onClick={ () => {
                    copy(`http://localhost:3000/${recipe.type}s/${recipe.id}`);
                    setCopy(true);
                  } }
                >
                  <img
                    data-testid={ `${index}-horizontal-share-btn` }
                    src={ shareIcon }
                    alt="icone de share"
                  />
                </button>
                <button
                  type="button"
                  onClick={ () => atualiza(recipe) }
                >
                  <img
                    data-testid={ `${index}-horizontal-favorite-btn` }
                    src={ blackHeartIcon }
                    alt="icone de heart"
                  />
                </button>
              </div>
            );
          }
          return ('');
        })}
      {filterDrink
        && saveLocal.filter((recipe) => recipe.type === 'drink').map((recipe, index) => {
          if (recipe.type === 'meal') {
            return ('');
          }
          return (
            <div key={ index }>
              <Link to={ `/drinks/${recipe.id}` }>
                <img
                  src={ `${recipe.image}` }
                  alt={ `Foto de ${recipe.name}` }
                  data-testid={ `${index}-horizontal-image` }
                  className="favoriteIMG"
                />

                <h3 data-testid={ `${index}-horizontal-name` }>{recipe.name}</h3>
              </Link>
              <p
                data-testid={ `${index}-horizontal-top-text` }
              >
                {`${recipe.nationality} - ${recipe.alcoholicOrNot}`}

              </p>
              <button
                type="button"
                onClick={ () => {
                  copy(`http://localhost:3000/${recipe.type}s/${recipe.id}`);
                  setCopy(true);
                } }
              >
                <img
                  data-testid={ `${index}-horizontal-share-btn` }
                  src={ shareIcon }
                  alt="icone de share"
                />
              </button>
              <button
                type="button"
                onClick={ () => atualiza(recipe) }
              >
                <img
                  data-testid={ `${index}-horizontal-favorite-btn` }
                  src={ blackHeartIcon }
                  alt="icone de heart"
                />
              </button>
            </div>
          );
        })}
      {copyClip && (
        <p>Link copied!</p>
      )}
    </div>
  );
}

export default FavoriteRecipes;
