import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Buttons from './Buttons';
import Card from './Card';
import AppContext from '../context/appContext';

const MAX_RENDER = 11;

function Recipes() {
  const { drinksList, setDrinksList } = useContext(AppContext);
  const [buttonsList, setButtonsList] = useState([]);

  const { mealList, setMealList } = useContext(AppContext);
  const history = useHistory();
  const renderMeals = history.location.pathname.includes('meals');

  useEffect(() => {
    const getMealsList = async () => {
      const endpoint = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
      const { meals } = await fetch(endpoint).then((response) => response.json());
      setMealList(meals);
    };
    getMealsList();
  }, [setMealList]);

  useEffect(() => {
    const getCategories = async () => {
      const content = renderMeals ? 'mealdb' : 'cocktaildb';
      const endpoint = `https://www.the${content}.com/api/json/v1/1/list.php?c=list`;
      const data = await fetch(endpoint).then((response) => response.json());
      const recipes = renderMeals ? data.meals : data.drinks;
      setButtonsList(recipes);
    };
    getCategories();
    return () => setButtonsList([]);
  }, [drinksList]);

  useEffect(() => {
    const getDrinksList = async () => {
      const endpoint = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
      const { drinks } = await fetch(endpoint).then((response) => response.json());
      setDrinksList(drinks);
    };
    getDrinksList();
  }, [setDrinksList]);

  return (
    <div>
      {renderMeals ? (
        <div>
          <Buttons categories={ buttonsList } type="meals" />
          {mealList.map((meal, i) => {
            if (i <= MAX_RENDER) {
              return (
                <section key={ meal.idMeal } data-testid={ `${i}-recipe-card` }>
                  <Card thumb={ meal.strMealThumb } str={ meal.strMeal } index={ i } />
                </section>
              );
            }
            return (null);
          })}
        </div>
      ) : (
        <div>
          <Buttons categories={ buttonsList } type="drinks" />
          {drinksList.map((drink, i) => {
            if (i <= MAX_RENDER) {
              return (
                <section key={ drink.idDrink } data-testid={ `${i}-recipe-card` }>
                  <Card
                    thumb={ drink.strDrinkThumb }
                    str={ drink.strDrink }
                    index={ i }
                  />
                </section>
              );
            }
            return (null);
          })}
        </div>
      )}

    </div>
  );
}

export default Recipes;
