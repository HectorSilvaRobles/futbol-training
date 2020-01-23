import axios from 'axios';
import {LOGIN_USER, REGISTER_USER, LOGOUT_USER, AUTH_USER} from './types'


export function registerUser(dataToSubmit){
    const request = axios.post('/api/coach-user/register', dataToSubmit)
    .then(res => res.data)

    return {
        type: REGISTER_USER,
        payload: request
    }
}

export function loginUser(dataToSubmit){
    const request = axios.post('/api/coach-user/login', dataToSubmit)
    .then(res => res.data)

    return {
        type: LOGIN_USER,
        payload: request
    }
}

export function auth(){
    const request = axios.get('/api/coach-user/auth',)
    .then(res => res.data)
    return {
        type: AUTH_USER,
        payload: request
    }
}

export function logoutUser(){
    const request = axios.get('/api/coach-user/logout',)
    .then(res => res.data)

    return {
        type: LOGOUT_USER,
        payload: request
    }
}