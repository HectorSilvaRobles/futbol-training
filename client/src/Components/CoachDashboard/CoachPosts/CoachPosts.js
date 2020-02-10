import React, { Component } from 'react'
import {connect} from 'react-redux'
import {createCoachPost, selectedAthleteForPost} from '../../../Redux/actions/coach_to_athlete_actions'

import AthleteSelect from '../AthleteSelect/AthleteSelect'

export class CoachPosts extends Component {

    handleSubmit = () => {
        console.log(this.props.coach_user)
        const {_id, lastname, profile_pic} = this.props.coach_user.userData
        const dataToSubmit = {
            "coach_id" : _id,
            "coach_name" : lastname,
            "coach_picture": profile_pic,
            "type_of_post" : 'Coach Reminder',
            "post" : 'Hey just reminding you of this'
        }

        console.log(dataToSubmit)
        createCoachPost(dataToSubmit)
    }
    render() {
        return (
            <div>
                <AthleteSelect selectedRedux={selectedAthleteForPost} />
                <button onClick={() => this.handleSubmit()}>Click</button>
            </div>
        )
    }
}

const mapPropsToState = (reduxState) => {
    return reduxState
}

export default connect(mapPropsToState)(CoachPosts)
