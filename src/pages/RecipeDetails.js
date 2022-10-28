import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';

import Footer from '../components/Footer';

function RecipeDetails() {
  const { id } = useParams();
  const history = useLocation();
  const renderRecipes = history.pathname.includes('meals');
  const [resultAPI, setResultAPI] = useState([]);

  useEffect(() => {
    const getRecipesID = async () => {
      const content = renderRecipes ? 'mealdb' : 'cocktaildb';
      const request = await fetch(`https://www.the${content}.com/api/json/v1/1/lookup.php?i=${id}`);
      const result = await request.json();
      console.log(result);
      const recipe = renderRecipes ? result.meals[0] : result.drinks[0];
      setResultAPI(recipe);
    };
    getRecipesID();
  }, [id, renderRecipes]);

  if (renderRecipes) {
    return (
      <div>
        <h1>{resultAPI.strMeal}</h1>
        <Footer />
      </div>
    );
  }
  return (
    <div>
      <h1>{resultAPI.strDrink}</h1>
      <Footer />
    </div>
  );
}

export default RecipeDetails;
