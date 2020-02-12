import React, { Component } from 'react'
import {connect} from 'react-redux'
import {createCoachPost} from '../../../Redux/actions/coach_to_athlete_actions'
import './coachposts.css'

import AthleteSelect from '../AthleteSelect/AthleteSelect'

export class CoachPosts extends Component {
    constructor(props){
        super(props)

        this.state = {
            selectedAthletes : []
        }
    }


    handleSubmit = () => {
        const {_id, lastname, profile_pic} = this.props.coach_user.userData
        let textArea = document.getElementById('coach-post-text').value

        // const dataToSubmit = {
        //     "coach_id" : _id,
        //     "coach_name" : lastname,
        //     "coach_picture": profile_pic,
        //     "type_of_post" : 'Coach Reminder',
        //     "post" : 'Hey just reminding you of this'
        // }

        // console.log(dataToSubmit)
        // createCoachPost(dataToSubmit)
    }

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

        return (
            <div>
            { userData ?
                <div className='coach-post-admin'>
                    <div className='coach-post-create-post'>
                        <div className='coach-post-create-header'>
                            <img src={userData.profile_pic} alt='coach picture' />
                            <h1>Coach {userData.lastname}</h1>
                        </div>
                        <div className='coach-post-create-textarea'>
                            <textarea 
                                cols='100' 
                                rows='6' 
                                maxLength='280' 
                                placeholder='Create a coach post'
                                id='coach-post-text'
                            ></textarea>
                            
                        </div>
                    </div>
                    <AthleteSelect callBack={this.callBackSelectedAthletes}  />
                    <button onClick={() => this.handleSubmit()}>Click</button>
                </div>
            :
            <div>Loading</div> 
            }
            </div>
        )
    }
}

const mapPropsToState = (reduxState) => {
    return reduxState
}

export default connect(mapPropsToState)(CoachPosts)
