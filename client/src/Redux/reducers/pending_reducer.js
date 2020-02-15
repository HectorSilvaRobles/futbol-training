import {GET_ALL_REQUESTS} from '../actions/types'

export default function(state = {}, action) {
    switch(action.type){
        case GET_ALL_REQUESTS:
            return {...state, all_request: action.payload}
        default: 
            return state;
    }
}