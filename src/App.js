import React from 'react';
import { Route, Switch } from 'react-router-dom';
import AppProvider from './context/appProvider';
import './App.css';
import Login from './pages/Login';
import Meals from './pages/meals';
import Drinks from './pages/drinks';
import MelsId from './pages/mealsId';
import DrinksId from './pages/drinksId';
import MealsIdProgress from './pages/mealsIdProgress';
import DrinksIdProgress from './pages/drinksIdProgress';
import Profile from './pages/Profile';
import DoneRecipes from './pages/doneRecipes';
import FavoriteRecipes from './pages/favoriteRecipes.';

function App() {
  return (
    <AppProvider>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/meals" component={ Meals } />
        <Route path="/drinks" component={ Drinks } />
        <Route path="/meals/:id-da-receita" component={ MelsId } />
        <Route path="/drinks/:id-da-receita" component={ DrinksId } />
        <Route path="/meals/:id-da-receita/in-progress" component={ MealsIdProgress } />
        <Route path="/drinks/:id-da-receita/in-progress" component={ DrinksIdProgress } />
        <Route path="/profile" component={ Profile } />
        <Route path="/done-recipes" component={ DoneRecipes } />
        <Route path="/favorite-recipes" component={ FavoriteRecipes } />

      </Switch>
    </AppProvider>
  );
}

export default App;
