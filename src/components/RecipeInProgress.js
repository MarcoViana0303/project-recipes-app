import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

function RecipeInProgress() {
  const [showRecipe, setShowRecipe] = useState([]);
  const { id } = useParams();
  const history = useHistory();
  const renderMeals = history.location.pathname.includes('meals');

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
  }, []);

  const showIngredients = () => {
    if (showRecipe.length) {
      const ingredientCheckbox = Object.entries(showRecipe[0]);
      const filteredIngredients = ingredientCheckbox
        .filter((item) => item[0]
          .includes('strIngredient') && item[1] !== '' && item[1] !== null);
      return filteredIngredients;
    }
    return [];
  };

  return (
    <div>
      <h1 data-testid="recipe-title">
        { renderMeals ? showRecipe[0]?.strMeal : showRecipe[0]?.strDrink}
      </h1>
      <img
        src={ renderMeals ? showRecipe[0]?.strMealThumb : showRecipe[0]?.strDrinkThumb }
        alt={ renderMeals ? showRecipe[0]?.strMeal : showRecipe[0]?.strDrink }
        data-testid="recipe-photo"
      />
      <br />
      <button data-testid="share-btn" type="button">Compartilhar</button>
      <button data-testid="favorite-btn" type="button">Favoritar</button>
      <p data-testid="recipe-category">{showRecipe[0]?.strCategory}</p>
      <p data-testid="instructions">{showRecipe[0]?.strInstructions}</p>
      {showIngredients().map((ingr, i) => (
        <label
          key={ i }
          htmlFor={ ingr[1] }
          data-testid={ `${i}-ingredient-step` }
        >
          <input type="checkbox" id={ ingr[1] } value={ ingr[1] } />
          {ingr[1]}
        </label>
      ))}
      <button data-testid="finish-recipe-btn" type="button">Finalizar</button>

    </div>
  );
}

export default RecipeInProgress;
