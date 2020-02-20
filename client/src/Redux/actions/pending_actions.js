import axios from 'axios';
import {GET_ALL_REQUESTS, SEND_REQUEST, REMOVE_REQUEST} from './types'


export function getAllRequest(){
    const request = axios.get('/api/pending/all-requests')
    .then(res => res.data)

    return {
        type: GET_ALL_REQUESTS,
        payload: request
    }
}


export function sendRequest(dataToSubmit){
    const sendRequestToSchema = {
        coach_writer: dataToSubmit.coach_writer,
        coach_profile_pic : dataToSubmit.coach_profile_pic,
        dataToSubmit : dataToSubmit,
        typeOfEndpoint : dataToSubmit.typeOfEndpoint
    }

    const request = axios.post('/api/pending/send-request', sendRequestToSchema)
    .then(res => res.data)

    return {
        type: SEND_REQUEST,
        payload: request
    }
}


export function removeRequest(request_id){
    let request = axios.delete(`/api/pending/remove/${request_id}`)
    .then(res => res.data)
    .catch(err => err)

    return {
        type: REMOVE_REQUEST,
        payload: request
    }
}