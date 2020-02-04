import React, {useEffect} from 'react';
import './App.css';
import {Route, Switch} from 'react-router-dom'
import Auth from './Hoc/auth'

import HomePage from './Components/Homepage/HomePage'
import RegisterPage from './Components/RegisterPage/RegisterPage'
import LoginPage from './Components/LoginPage/LoginPage'
import AthletesPage from './Components/AthletesPage/AthletesPage'
import CoachesPage from './Components/CoachesPage/CoachesPage'
import NavBar from './Components/NavBar/NavBar'
import CoachDashboard from './Components/CoachDashboard/CoachDashboard'

// getting all athletes
import {getAllAthletes} from './Redux/actions/athlete_actions'
import {useDispatch, useSelector} from 'react-redux'


function App() {
  // getting all athletes
  const dispatch = useDispatch()
  
  dispatch(getAllAthletes()).then(res => {
    console.log(res)
  })

  return (
    <div className="App">
      <NavBar />
      <div>
        <Switch>
          <Route exact path='/' component={Auth(HomePage, null)} />
          <Route exact path='/register' component={Auth(RegisterPage, false)} />
          <Route exact path='/login' component={Auth(LoginPage, false)} />
          <Route exact path='/athletes' component={Auth(AthletesPage, null)} />
          <Route exact path='/coaches' component={Auth(CoachesPage, null)} />
          <Route exact path='/coach-dashboard' component={Auth(CoachDashboard, true)} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
