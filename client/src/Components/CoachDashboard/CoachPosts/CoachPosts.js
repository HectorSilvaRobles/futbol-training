import React, { Component } from 'react'
import {connect} from 'react-redux'
import {createCoachPost} from '../../../Redux/actions/coach_to_athlete_actions'

import AthleteSelect from '../AthleteSelect/AthleteSelect'

export class CoachPosts extends Component {
    constructor(props){
        super(props)

        this.state = {
            selectedAthletes : []
        }
    }
    // handleSubmit = () => {
    //     console.log(this.props.coach_user)
    //     const {_id, lastname, profile_pic} = this.props.coach_user.userData
    //     const dataToSubmit = {
    //         "coach_id" : _id,
    //         "coach_name" : lastname,
    //         "coach_picture": profile_pic,
    //         "type_of_post" : 'Coach Reminder',
    //         "post" : 'Hey just reminding you of this'
    //     }

    //     console.log(dataToSubmit)
    //     createCoachPost(dataToSubmit)
    // }

    callBackSelectedAthletes = (athlete_id) => {
        // Add selected athlete to state 
        if(!this.state.selectedAthletes.includes(athlete_id)){
            var joined = this.state.selectedAthletes.concat(athlete_id)
            this.setState({selectedAthletes: joined})
        } else {
            var remove = this.state.selectedAthletes.filter(e => e !== athlete_id)
            this.setState({selectedAthletes: remove})
        }  
    }

    render() {
        console.log(this.state)
        console.log(this.props)
        const {userData} = this.props.coach_user
        let coach_user;
        
        return (
            <div>
                <div className='coach-post-create-post'>
                    <div>
                        {coach_user ? <div>{userData.lastname}</div> : null}
                    </div>
                </div>
                <AthleteSelect callBack={this.callBackSelectedAthletes}  />
                {/* <button onClick={() => this.handleSubmit()}>Click</button> */}
            </div>
        )
    }
}

const mapPropsToState = (reduxState) => {
    return reduxState
}

export default connect(mapPropsToState)(CoachPosts)
