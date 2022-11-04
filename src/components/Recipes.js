import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Buttons from './Buttons';
import Card from './Card';
import AppContext from '../context/AppContext';

const MAX_RENDER = 11;

function Recipes() {
  const {
    drinksList,
    setDrinksList,
    handleControl,
    dataMeals,
    dataDrinks,
    setHandleControl,
  } = useContext(AppContext);
  const [buttonsList, setButtonsList] = useState([]);

  const { mealList, setMealList } = useContext(AppContext);
  const history = useHistory();
  const renderMeals = history.location.pathname.includes('meals');

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
  }, []);

  useEffect(() => {
    if (!handleControl) {
      const getMealsList = async () => {
        const endpoint = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
        const { meals } = await fetch(endpoint).then((response) => response.json());
        setMealList(meals);
      };
      getMealsList();
    }
  }, [setMealList]);

  useEffect(() => {
    if (!handleControl) {
      const getDrinksList = async () => {
        const endpoint = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
        const { drinks } = await fetch(endpoint).then((response) => response.json());
        setDrinksList(drinks);
      };
      getDrinksList();
    }
  }, [setDrinksList]);

  useEffect(() => {
    const { drinks } = dataDrinks;
    if (handleControl && drinks) {
      setDrinksList(drinks);
      setHandleControl(false);
    }
  }, [dataDrinks]);

  useEffect(() => {
    const { meals } = dataMeals;
    if (handleControl && meals) {
      setMealList(meals);
      setHandleControl(false);
    }
  }, [dataMeals]);

  return (
    <div>
      {renderMeals ? (
        <div>
          <Buttons categories={ buttonsList } type="meals" />
          {mealList.map((meal, i) => {
            if (i <= MAX_RENDER) {
              return (
                <section key={ meal.idMeal } data-testid={ `${i}-recipe-card` }>
                  <Card
                    thumb={ meal.strMealThumb }
                    str={ meal.strMeal }
                    index={ i }
                    idMeal={ meal.idMeal }
                  />
                </section>
              );
            }
            return null;
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
                    idMeal={ drink.idDrink }
                  />
                </section>
              );
            }
            return null;
          })}
        </div>
      )}
    </div>
  );
}

export default Recipes;
// asds
