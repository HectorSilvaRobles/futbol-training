import React, { Component } from 'react'
import {connect} from 'react-redux'
import {createCoachPost} from '../../../Redux/actions/coach_to_athlete_actions'
import './coachposts.css'
import AthleteSelect from '../AthleteSelect/AthleteSelect'

export class CoachPosts extends Component {
    constructor(props){
        super(props)

        this.state = {
            selectedAthletes : [],
            error: false,
            postSuccess: false
        }
    }

    handleSubmit = () => {
        const {lastname, profile_pic, accountRole} = this.props.coach_user.userData
        let textArea = document.getElementById('coach-post-text').value
        let coachType = document.getElementById('coach-post-type').value

        // Error handling if textarea/coachType/selectedAthletes are empty
        if(!textArea || !coachType || this.state.selectedAthletes.length < 1){
            this.setState({errorPost: true})
        } else {
            this.setState({errorPost: false})
            this.state.selectedAthletes.map(val => {
                const dataToSubmit = {
                    "coach_writer" : lastname,
                    "coach_profile_pic": profile_pic,
                    "type_of_post" : coachType,
                    "coach_message" : textArea,
                    "athlete_id" : val
                }

                // If coach user account role is admin it will post, if not it will send it to a pending list where an admin will confirm it
                if(accountRole == 'Admin') {
                    this.props.createCoachPost(dataToSubmit).then(res => {
                        console.log('hit')
                        if(res.payload.success){
                            this.setState({postSuccess: true})
                        }
                    })
                } else {
                    console.log('Sent to pending list')
                }
                
            })
        }
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


    // Reset the component inputs after the coach post is successfully saved
    handleReset = () => {
        document.getElementById('coach-post-text').value = ''
        document.getElementById('coach-post-type').value = ''
        var selectedAthletes = document.getElementsByTagName('input');
        
        for(var i = 0; i<selectedAthletes.length; i++){
            selectedAthletes[i].checked = false
        }

        setTimeout(() => {
            alert('Successful post')
            this.setState({
                selectedAthletes: [],
                postSuccess: false
            })
        }, 500)
    }

    render() {
        const {userData} = this.props.coach_user
        return (
            <div>
            { userData ?
                <div className='coach-post-admin'>
                    {this.state.postSuccess ? this.handleReset() : null}
                    {this.state.errorPost ? alert('Error') : null}
                    <div className='coach-post-create-post'>
                        <div className='coach-post-create-header'>
                            <img src={userData.profile_pic} alt='coach picture' />
                            <h1>Coach {userData.lastname}</h1>
                        </div>
                        <div className='coach-post-create-textarea'>
                            <textarea 
                                cols='100' 
                                rows='5' 
                                maxLength='280' 
                                placeholder='Create a coach post'
                                id='coach-post-text'
                            ></textarea>
                            <div className='coach-post-create-select'>
                                <h2>Post Type</h2>
                                <select id='coach-post-type'>
                                    <option value='' >Select</option>
                                    <option value='coach note' >Coach Note</option>
                                    <option value='coach reminder' >Coach Reminder</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <AthleteSelect callBack={this.callBackSelectedAthletes}  />
                    <button onClick={() => this.handleSubmit()} className='create-post-button'>Create Post</button>
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

const mapReduxState = {
    createCoachPost
}

const myConnect = connect(mapPropsToState, mapReduxState)

export default myConnect(CoachPosts)