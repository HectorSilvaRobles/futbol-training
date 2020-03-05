import axios from 'axios'
import {CREATE_COACH_POST, CREATE_PERFORMANCE_LOG, UPLOAD_HIGHLIGHT} from './types'


var newDate = new Date()
var months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
const theMonth = months[newDate.getMonth()]
const theDay = newDate.getDate()
const theYear = newDate.getFullYear()
const theDate = `${theMonth} ${theDay}, ${theYear}`


export function createCoachPost(dataToSubmit){
    const {athlete_id, coach_writer, coach_profile_pic, coach_message, type_of_post} = dataToSubmit
    let newData = {
        "coach_posts" : {
            coach_writer,
            coach_profile_pic,
            coach_message,
            type_of_post,
            "date_of_post" : theDate
        }
    }

    let request = axios.put(`/api/coach_to_athlete/coach-post/${athlete_id}`, newData)
    .then(response => response.data)
    .catch(err => err)

    return {
        type: CREATE_COACH_POST,
        payload: request
    }
}


export function createPerformanceLog(dataToSubmit){
    const {athlete_id, focus_rating, leadership_rating, energy_rating, coach_writer} = dataToSubmit
    let newData = {
        "performance_logs" : {
            focus_rating,
            leadership_rating,
            energy_rating,
            coach_writer,
            "date_of_post" : theDate
        }
    }

    let request = axios.put(`/api/coach_to_athlete/performance-log/${athlete_id}`, newData)
    .then(res => res.data)
    .catch(err => err)
    
    return {
        type: CREATE_PERFORMANCE_LOG,
        payload: request
    }
}


export function uploadHighlight(dataToSubmit) {
    
    const {athlete_id, coach_id, coach_writer, video_link} = dataToSubmit
    let newData = {
        "highlights" : {
            coach_id,
            coach_writer,
            video_link,
            "date_of_post" : theDate
        }
    }

    let request = axios.put(`/api/coach_to_athlete/upload-highlight/${athlete_id}`, newData)
    .then(res => res.data)
    .catch(err => err)

    
    return {
        type: UPLOAD_HIGHLIGHT,
        payload: request
    }
}
