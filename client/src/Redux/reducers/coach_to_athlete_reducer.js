import {CREATE_COACH_POST, POST_SELECTED_ATHLETES} from '../actions/types'


export default function(state = {}, action){
    switch(action.type){
        case CREATE_COACH_POST:
            return {...state, coach_post: action.payload}
        case POST_SELECTED_ATHLETES:
            return {...state, post_selected_athletes: action.payload}
        default: 
            return state;
    }
}