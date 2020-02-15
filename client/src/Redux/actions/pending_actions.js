import axios from 'axios';
import {GET_ALL_REQUESTS} from './types'

export function getAllRequest(){
    const request = axios.get('/api/pending/all-requests')
    .then(res => res.data)
    
    return {
        type: GET_ALL_REQUESTS,
        payload: request
    }
}