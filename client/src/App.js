import React from 'react';
import './App.css';
import {Route, Switch} from 'react-router-dom'

import HomePage from './Components/Homepage/HomePage'
import RegisterPage from './Components/RegisterPage/RegisterPage'
import LoginPage from './Components/LoginPage/LoginPage'


function App() {
  return (
    <div className="App">
      <div>
        <Route exact path='/' component={HomePage} />
        <Route exact path='/register' component={RegisterPage} />
        <Route exact path='/login' component={LoginPage} />

      </div>
    </div>
  );
}

export default App;
