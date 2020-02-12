import {CREATE_COACH_POST} from '../actions/types'


export default function(state = {}, action){
    switch(action.type){
        case CREATE_COACH_POST:
            return {...state, coach_post: action.payload}
        default: 
            return state;
    }
}