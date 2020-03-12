import axios from 'axios';
import {LOGIN_USER, REGISTER_USER, LOGOUT_USER, AUTH_USER, UPDATE_USER} from './types'


export function registerUser(dataToSubmit){
    const request = axios.post('/api/coach-users/register', dataToSubmit)
    .then(res => res.data)
    .catch(err => err)

    return {
        type: REGISTER_USER,
        payload: request
    }
}

export function loginUser(dataToSubmit){
    const request = axios.post('/api/coach-users/login', dataToSubmit)
    .then(res => res.data)

    return {
        type: LOGIN_USER,
        payload: request
    }
}

export function auth(){
    const request = axios.get('/api/coach-users/auth',)
    .then(res => res.data)
    return {
        type: AUTH_USER,
        payload: request
    }
}

export function logoutUser(){
    const request = axios.get('/api/coach-users/logout',)
    .then(res => res.data)

    return {
        type: LOGOUT_USER,
        payload: request
    }
}


export function updateUser(dataToSubmit){
    // Create a new object with valid values
    console.log(dataToSubmit)
    let newObject = {}
    for(let [key, value] of Object.entries(dataToSubmit)){
        if(value !== '' && key !== 'coach_id'){
            newObject[key] = value
        }
    }

    console.log(newObject)

    let request = axios.put(`/api/coach-users/update-coach/${dataToSubmit.coach_id}`, newObject)
    .then(res => res.data)
    .catch(err => err)

    return {
        type: UPDATE_USER,
        payload: request
    }
    
}