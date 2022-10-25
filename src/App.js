import React from 'react';
import { Route, Switch } from 'react-router-dom';
import AppProvider from './context/appProvider';
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
        <Route path="/meals" component={ Meals } />
        <Route path="/drinks" component={ Drinks } />
        <Route
          path="/meals/:id-da-receita"
          render={ (props) => <MealsId { ...props } /> }
        />
        <Route
          path="/drinks/:id-da-receita"
          render={ (props) => <Drinks { ...props } /> }
        />
        <Route
          path="/meals/:id-da-receita/in-progress"
          render={ (props) => <MealsIdProgress { ...props } /> }
        />
        <Route
          path="/drinks/:id-da-receita/in-progress"
          render={ (props) => <DrinksIdProgress { ...props } /> }
        />
        <Route path="/profile" component={ Profile } />
        <Route path="/done-recipes" component={ DoneRecipes } />
        <Route path="/favorite-recipes" component={ FavoriteRecipes } />
      </Switch>
    </AppProvider>
  );
}

export default App;
