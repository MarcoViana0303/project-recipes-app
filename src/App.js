import React from 'react';
import { Route, Switch } from 'react-router-dom';
import AppProvider from './context/appProvider';
import './App.css';
import Login from './pages/Login';

function App() {
  return (
    <AppProvider>
      <Switch>
        <Route exact path="/" component={ Login } />
      </Switch>
    </AppProvider>

  );
}

export default App;
