import {combineReducers} from 'redux';
import coach_user from './coach_user';
import athletes_reducer from './athletes_reducer';

export default combineReducers({
    coach_user: coach_user,
    athletes_reducer: athletes_reducer,
    
})