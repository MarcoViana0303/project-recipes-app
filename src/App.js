import React from 'react';
import { Route, Switch } from 'react-router-dom';
import AppProvider from './context/appProvider';
import './App.css';
import Login from './pages/Login';
import meals from './pages/meals';
import drinks from './pages/drinks';
import melsId from './pages/mealsId';
import drinksId from './pages/drinksId';
import mealsIdProgress from './pages/mealsIdProgress';
import drinksIdProgress from './pages/drinksIdProgress';
import profile from './pages/profile';
import doneRecipes from './pages/doneRecipes';
import favoriteRecipes from './pages/favoriteRecipes.';

function App() {
  return (
    <AppProvider>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/meals" component={ meals } />
        <Route path="/drinks" component={ drinks } />
        <Route path="/meals/:id-da-receita" component={ melsId } />
        <Route path="/drinks/:id-da-receita" component={ drinksId } />
        <Route path="/meals/:id-da-receita/in-progress" component={ mealsIdProgress } />
        <Route path="/drinks/:id-da-receita/in-progress" component={ drinksIdProgress } />
        <Route path="/profile" component={ profile } />
        <Route path="/done-recipes" component={ doneRecipes } />
        <Route path="/favorite-recipes" component={ favoriteRecipes } />

      </Switch>
    </AppProvider>

  );
}

export default App;
