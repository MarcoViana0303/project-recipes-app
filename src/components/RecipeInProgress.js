import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import '../style/recipelnProgress.css';
import icon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

const dateNow = new Date();
// import DoneRecipes from '../pages/DoneRecipes';

const copy = require('clipboard-copy');

function RecipeInProgress() {
  const [showRecipe, setShowRecipe] = useState([]);
  const [idInput, setIdInput] = useState([]);
  const [copy1, setCopy1] = useState(false);
  const [favorite, setfavorite] = useState(false);
  const [isActivatedButton, setisActivatedButton] = useState(true);
  const { id } = useParams();
  const history = useHistory();
  const renderMeals = history.location.pathname.includes('meals');

  const copyButton = () => {
    if (history.location.pathname.includes('meals')) {
      copy(`http://localhost:3000/meals/${id}`);
    } else {
      copy(`http://localhost:3000/drinks/${id}`);
    }
    setCopy1(true);
  };

  const getlocalStorage = () => {
    const favorites = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    const favoriteFromStorage = favorites.find((el) => el.id);
    if (id === favoriteFromStorage?.id) {
      setfavorite(true);
    }
  };

  const removeFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    const favoriteFromStorage = favorites.filter((el) => el.id !== id);
    localStorage.setItem(
      'favoriteRecipes',
      JSON.stringify(favoriteFromStorage),
    );
  };

  const salveFavorite = () => {
    if (renderMeals) {
      const local = [
        {
          id: showRecipe[0].idMeal,
          type: 'meal',
          nationality: showRecipe[0].strArea,
          category: showRecipe[0].strCategory,
          alcoholicOrNot: '',
          name: showRecipe[0].strMeal,
          image: showRecipe[0].strMealThumb,
        },
      ];
      localStorage.setItem('favoriteRecipes', JSON.stringify(local));
      console.log(local);
    } else {
      const local = [
        {
          id: showRecipe[0].idDrink,
          type: 'drink',
          nationality: '',
          category: showRecipe[0].strCategory,
          alcoholicOrNot: showRecipe[0].strAlcoholic,
          name: showRecipe[0].strDrink,
          image: showRecipe[0].strDrinkThumb,
        },
      ];
      localStorage.setItem('favoriteRecipes', JSON.stringify(local));
    }
  };

  useEffect(() => {
    if (renderMeals) {
      const getMealsList = async () => {
        const endpoint = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
        const { meals } = await fetch(endpoint).then((response) => response.json());
        setShowRecipe(meals);
      };
      getMealsList();
    } else {
      const getDrinksList = async () => {
        const endpoint = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
        const { drinks } = await fetch(endpoint).then((response) => response.json());
        setShowRecipe(drinks);
      };
      getDrinksList();
    }
    const checked = JSON.parse(localStorage.getItem(id)) || [];
    setIdInput(checked);
    getlocalStorage();
  }, []);

  useEffect(() => {
    if (favorite) {
      salveFavorite();
    } else {
      removeFavorite();
    }
  }, [favorite]);

  const showIngredients = () => {
    if (showRecipe.length) {
      const ingredientCheckbox = Object.entries(showRecipe[0]);
      const filteredIngredients = ingredientCheckbox.filter(
        (item) => item[0].includes('strIngredient')
          && item[1] !== ''
          && item[1] !== null,
      );
      return filteredIngredients;
    }
    return [];
  };

  const disableButton = () => {
    const numCheckboxes = showIngredients().length;
    if (numCheckboxes <= idInput.length) {
      setisActivatedButton(false);
    } else {
      setisActivatedButton(true);
    }
  };

  useEffect(() => {
    if (idInput.length === 0) {
      localStorage.removeItem(id);
    } else {
      localStorage.setItem(id, JSON.stringify(idInput));
    }
    disableButton();
  }, [idInput]);

  const handleClick = (target, arg) => {
    if (target.checked) {
      setIdInput((prev) => [...prev, arg]);
    } else {
      const filterId = idInput.filter((str) => str !== arg);
      setIdInput(filterId);
    }
  };

  const handleFavorite = () => {
    setfavorite((prev) => !prev);
  };

  const handleFinish = () => {
    if (renderMeals) {
      const local = [
        {
          alcoholicOrNot: '',
          category: showRecipe[0].strCategory,
          doneDate: dateNow.toISOString(),
          id: showRecipe[0].idMeal,
          image: showRecipe[0].strMealThumb,
          name: showRecipe[0].strMeal,
          nationality: showRecipe[0].strArea,
          tags: showRecipe[0]?.strTags.split(','),
          type: 'meal',
        },
      ];
      localStorage.setItem('doneRecipes', JSON.stringify(local));
      console.log(local);
    } else {
      const local = [
        {
          id: showRecipe[0].idDrink,
          doneDate: dateNow.toISOString(),
          tags: showRecipe[0]?.strTags.split(','),
          type: 'drink',
          nationality: '',
          category: showRecipe[0].strCategory,
          alcoholicOrNot: showRecipe[0].strAlcoholic,
          name: showRecipe[0].strDrink,
          image: showRecipe[0].strDrinkThumb,
        },
      ];
      localStorage.setItem('doneRecipes', JSON.stringify(local));
    }
    // localStorage.setItem('doneRecipes', JSON.stringify({ id: 'name' }));
    history.push('/done-recipes');
  };

  // console.log(showRecipe);

  return (
    <div>
      <h1 data-testid="recipe-title">
        {renderMeals ? showRecipe[0]?.strMeal : showRecipe[0]?.strDrink}
      </h1>
      <img
        src={ showRecipe[0]?.strMealThumb || showRecipe[0]?.strDrinkThumb }
        alt={ renderMeals ? showRecipe[0]?.strMeal : showRecipe[0]?.strDrink }
        data-testid="recipe-photo"
        className="imagem"
      />
      <br />
      {copy1 && 'Link copied!'}

      <button data-testid="share-btn" type="button" onClick={ copyButton }>
        <img src={ icon } alt="compartilhar" />
      </button>

      <button type="button" onClick={ handleFavorite }>
        {favorite && (
          <img src={ blackHeartIcon } alt="Favorito" data-testid="favorite-btn" />
        )}
        {!favorite && (
          <img src={ whiteHeartIcon } alt="Favorito" data-testid="favorite-btn" />
        )}
      </button>

      <p data-testid="recipe-category">{showRecipe[0]?.strCategory}</p>
      <p data-testid="instructions" className="instructions">
        {showRecipe[0]?.strInstructions}
      </p>
      {showIngredients().map((ingr, i) => (
        <label
          key={ i }
          htmlFor={ ingr[1] }
          data-testid={ `${i}-ingredient-step` }
          className={ idInput.includes(ingr[1]) && 'riscado' }
        >
          <input
            onClick={ ({ target }) => handleClick(target, ingr[1]) }
            type="checkbox"
            id={ ingr[1] }
            value={ ingr[1] }
            checked={ idInput.includes(ingr[1]) }
          />
          {ingr[1]}
        </label>
      ))}
      <button
        data-testid="finish-recipe-btn"
        type="button"
        disabled={ isActivatedButton }
        onClick={ handleFinish }
      >
        Finalizar
      </button>
    </div>
  );
}

export default RecipeInProgress;
