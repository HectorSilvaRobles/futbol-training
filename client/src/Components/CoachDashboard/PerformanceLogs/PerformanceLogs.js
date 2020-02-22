import React, {Component} from 'react'
import {connect} from 'react-redux';
import './performance.css'
import Rating from './Ratings/Ratings'

import AthleteSelect from '../AthleteSelect/AthleteSelect'

class PerformanceLogs extends Component {
    constructor(props){
        super(props)

        this.state = {
            selectedAthletes : [],
            energy_rating: null,
            energy_rating_hover: null
        }
    }


     // Add selected athlete to state 
     callBackSelectedAthletes = (athlete_id) => {
        if(!this.state.selectedAthletes.includes(athlete_id)){
            var joined = this.state.selectedAthletes.concat(athlete_id)
            this.setState({selectedAthletes: joined})
        } else {
            var remove = this.state.selectedAthletes.filter(e => e !== athlete_id)
            this.setState({selectedAthletes: remove})
        }  
    }



    render(){
        const {userData} = this.props.coach_user

        return (
            <div>
                {userData ? 
                    <div className='performance-log-admin'>
                        <div className='performance-log-rating'>
                            <div className='rating-card'>
                                {<Rating />}
                            </div>
                            <div className='rating-card'>
                                {<Rating />}
                            </div>
                            <div className='rating-card'>

                            </div>
                        </div>
                        <AthleteSelect callBack={this.callBackSelectedAthletes} />
                    </div> 
                    : 
                    <div>Loading</div>
                }
            </div>
        )
    }
}

const mapPropsToState = (reduxstate) => {
    return reduxstate
}


const myconnect = connect(mapPropsToState)

export default myconnect(PerformanceLogs)