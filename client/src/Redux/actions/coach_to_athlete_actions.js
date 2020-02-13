import axios from 'axios'
import {CREATE_COACH_POST} from './types'

export function createCoachPost(dataToSubmit){
    const {athlete_id, coach_writer, coach_profile_pic, coach_message, type_of_post} = dataToSubmit
    let newData = {
        "coach_posts" : {
            coach_writer,
            coach_profile_pic,
            coach_message,
            type_of_post
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
