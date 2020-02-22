import {CREATE_COACH_POST, CREATE_PERFORMANCE_LOG} from '../actions/types'

export default function(state = {}, action){
    switch(action.type){
        case CREATE_COACH_POST:
            return {...state, coach_post: action.payload}
        case CREATE_PERFORMANCE_LOG:
            return {...state, performance_log: action.payload}
        default: 
            return state;
    }
}