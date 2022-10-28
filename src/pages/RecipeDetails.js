import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';

import Footer from '../components/Footer';

function RecipeDetails() {
  const { id } = useParams();
  const history = useLocation();
  const renderRecipes = history.pathname.includes('meals');
  const [dataAPI, setDataAPI] = useState([]);

  useEffect(() => {
    const getRecipesID = async () => {
      const content = renderRecipes ? 'mealdb' : 'cocktaildb';
      const request = await fetch(`https://www.the${content}.com/api/json/v1/1/lookup.php?i=${id}`);
      const result = await request.json();
      console.log(result);
      const recipe = renderRecipes ? result.meals[0] : result.drinks[0];
      setDataAPI(recipe);
    };
    getRecipesID();
  }, [id, renderRecipes]);

  if (renderRecipes) {
    return (
      <div>
        <h1 data-testid="recipe-title">{dataAPI.strMeal}</h1>
        <img
          src={ `${dataAPI.strMealThumb}` }
          alt={ `${dataAPI.strMeal}` }
          data-testid="recipe-photo"
        />
        <h2 data-testid="recipe-category">{dataAPI.strCategory}</h2>
        <p data-testid="instructions">{dataAPI.strInstructions}</p>

        <ul>
          <li data-testid="0-ingredient-name-and-measure">{dataAPI.strIngredient1}</li>
          <li data-testid="1-ingredient-name-and-measure">{dataAPI.strIngredient2}</li>
          <li data-testid="2-ingredient-name-and-measure">{dataAPI.strIngredient3}</li>
          <li data-testid="3-ingredient-name-and-measure">{dataAPI.strIngredient4}</li>
          <li data-testid="4-ingredient-name-and-measure">{dataAPI.strIngredient5}</li>
          <li data-testid="5-ingredient-name-and-measure">{dataAPI.strIngredient6}</li>
          <li data-testid="6-ingredient-name-and-measure">{dataAPI.strIngredient7}</li>
          <li data-testid="7-ingredient-name-and-measure">{dataAPI.strIngredient8}</li>
          <li data-testid="8-ingredient-name-and-measure">{dataAPI.strIngredient9}</li>
          <li data-testid="9-ingredient-name-and-measure">{dataAPI.strIngredient10}</li>
          <li data-testid="10-ingredient-name-and-measure">{dataAPI.strIngredient11}</li>
          <li data-testid="11-ingredient-name-and-measure">{dataAPI.strIngredient12}</li>
          <li data-testid="12-ingredient-name-and-measure">{dataAPI.strIngredient13}</li>
          <li data-testid="13-ingredient-name-and-measure">{dataAPI.strIngredient14}</li>
          <li data-testid="14-ingredient-name-and-measure">{dataAPI.strIngredient15}</li>
          <li data-testid="15-ingredient-name-and-measure">{dataAPI.strIngredient16}</li>
          <li data-testid="16-ingredient-name-and-measure">{dataAPI.strIngredient17}</li>
          <li data-testid="17-ingredient-name-and-measure">{dataAPI.strIngredient18}</li>
          <li data-testid="18-ingredient-name-and-measure">{dataAPI.strIngredient19}</li>
          <li data-testid="19-ingredient-name-and-measure">{dataAPI.strIngredient20}</li>
        </ul>

        <iframe
          title={ `${dataAPI.strMeal}` }
          width="420"
          height="315"
          src={ `${dataAPI.strYoutube}` }
          data-testid="video"
        />

        <Footer />
      </div>
    );
  }
  return (
    <div>
      <h1 data-testid="recipe-title">{dataAPI.strDrink}</h1>
      <img
        src={ `${dataAPI.strDrinkThumb}` }
        alt={ `${dataAPI.strDrink}` }
        data-testid="recipe-photo"
      />
      <h2 data-testid="recipe-category">
        {dataAPI.strCategory}
        {dataAPI.strAlcoholic}
      </h2>
      <p data-testid="instructions">{dataAPI.strInstructions}</p>

      <ul>
        <li data-testid="0-ingredient-name-and-measure">{dataAPI.strIngredient1}</li>
        <li data-testid="1-ingredient-name-and-measure">{dataAPI.strIngredient2}</li>
        <li data-testid="2-ingredient-name-and-measure">{dataAPI.strIngredient3}</li>
        <li data-testid="3-ingredient-name-and-measure">{dataAPI.strIngredient4}</li>
        <li data-testid="4-ingredient-name-and-measure">{dataAPI.strIngredient5}</li>
        <li data-testid="5-ingredient-name-and-measure">{dataAPI.strIngredient6}</li>
        <li data-testid="6-ingredient-name-and-measure">{dataAPI.strIngredient7}</li>
        <li data-testid="7-ingredient-name-and-measure">{dataAPI.strIngredient8}</li>
        <li data-testid="8-ingredient-name-and-measure">{dataAPI.strIngredient9}</li>
        <li data-testid="9-ingredient-name-and-measure">{dataAPI.strIngredient10}</li>
        <li data-testid="10-ingredient-name-and-measure">{dataAPI.strIngredient11}</li>
        <li data-testid="11-ingredient-name-and-measure">{dataAPI.strIngredient12}</li>
        <li data-testid="12-ingredient-name-and-measure">{dataAPI.strIngredient13}</li>
        <li data-testid="13-ingredient-name-and-measure">{dataAPI.strIngredient14}</li>
        <li data-testid="14-ingredient-name-and-measure">{dataAPI.strIngredient15}</li>
        <li data-testid="15-ingredient-name-and-measure">{dataAPI.strIngredient16}</li>
        <li data-testid="16-ingredient-name-and-measure">{dataAPI.strIngredient17}</li>
        <li data-testid="17-ingredient-name-and-measure">{dataAPI.strIngredient18}</li>
        <li data-testid="18-ingredient-name-and-measure">{dataAPI.strIngredient19}</li>
        <li data-testid="19-ingredient-name-and-measure">{dataAPI.strIngredient20}</li>
      </ul>

      <Footer />
    </div>
  );
}

export default RecipeDetails;
