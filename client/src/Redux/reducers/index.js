import {combineReducers} from 'redux';
import coach_user from './coach_user';
import athletes_reducer from './athletes_reducer';
import coach_to_athlete_reducer from './coach_to_athlete_reducer'

export default combineReducers({
    coach_user: coach_user,
    athletes_reducer: athletes_reducer,
    coach_to_athlete_reducer: coach_to_athlete_reducer
})