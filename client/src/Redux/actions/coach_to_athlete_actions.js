import axios from 'axios'
import {CREATE_COACH_POST, POST_SELECTED_ATHLETES} from './types'

export function createCoachPost(dataToSubmit){
    console.log(dataToSubmit)
    // const request = axios.put('/api/coach_to_athlete/coach-post/')
}


export function selectedAthleteForPost(dataToSubmit){
    console.log(dataToSubmit)
    return {
        type: POST_SELECTED_ATHLETES,
        payload: dataToSubmit
    }
}