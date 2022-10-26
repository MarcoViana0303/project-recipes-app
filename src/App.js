import React from 'react';
import { Route, Switch } from 'react-router-dom';
import AppProvider from './context/AppProvider';
import './App.css';
import Login from './pages/Login';
import Meals from './pages/Meals';
import Drinks from './pages/Drinks';
import MealsId from './pages/MealsId';
import DrinksId from './pages/DrinksId';
import MealsIdProgress from './pages/MealsIdProgress';
import DrinksIdProgress from './pages/DrinksIdProgress';
import Profile from './pages/Profile';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';

function App() {
  return (
    <AppProvider>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/meals" component={ Meals } />
        <Route exact path="/drinks" component={ Drinks } />
        <Route exact path="/meals/:id" component={ MealsId } />
        <Route exact path="/drinks/:id" component={ DrinksId } />
        <Route
          exact
          path="/meals/:id/in-progress"
          component={ MealsIdProgress }
        />
        <Route
          exact
          path="/drinks/:id/in-progress"
          component={ DrinksIdProgress }
        />
        <Route path="/profile" component={ Profile } />
        <Route path="/done-recipes" component={ DoneRecipes } />
        <Route path="/favorite-recipes" component={ FavoriteRecipes } />
      </Switch>
    </AppProvider>
  );
}

export default App;
