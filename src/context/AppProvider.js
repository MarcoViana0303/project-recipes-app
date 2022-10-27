import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import AppContext from './AppContext';

function AppProvider({ children }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [dataMeals, setDataMeals] = useState({});
  const [dataDrinks, setDataDrinks] = useState({});
  const [searchInput, setSearchInput] = useState({});
  const [mealList, setMealList] = useState([]);
  const [drinksList, setDrinksList] = useState([]);

  const requestMealsAPI = async (type, endPoint, filter) => {
    const request = await fetch(
      `https://www.themealdb.com/api/json/v1/1/${filter}.php?${type}=${endPoint}`,
    );
    const response = await request.json();
    setDataMeals(response);
    console.log(response);
  };

  async function requestDrinksAPI(type, endPoint, filter) {
    const request = await fetch(
      `https://www.thecocktaildb.com/api/json/v1/1/${filter}.php?${type}=${endPoint}`,
    );
    const response = await request.json();
    setDataDrinks(response);
  }

  const contexto = useMemo(() => (
    {
      dataMeals,
      dataDrinks,
      email,
      password,
      searchInput,
      setSearchInput,
      setPassword,
      setEmail,
      requestMealsAPI,
      requestDrinksAPI,
      mealList,
      setMealList,
      drinksList,
      setDrinksList,
    }
  ), [dataMeals, dataDrinks, email, password, searchInput, mealList, drinksList]);

  return <AppContext.Provider value={ contexto }>{children}</AppContext.Provider>;
}

AppProvider.propTypes = {
  children: PropTypes.shape.isRequired,
};

export default AppProvider;
