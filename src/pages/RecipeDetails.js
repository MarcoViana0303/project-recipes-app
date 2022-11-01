import React from 'react';
import { useHistory } from 'react-router-dom';
import '../recipedetails.css';
import MealDetail from '../components/MealDetail';
import DrinkDetail from '../components/DrinkDetail';

export default function RecipeDetails() {
  const history = useHistory();
  const renderRecipes = history.location.pathname.includes('meals');

  if (renderRecipes) {
    return (
      <MealDetail />
    );
  }
  return (
    <DrinkDetail />
  );
}
