import React, {Component} from 'react'
import {connect} from 'react-redux';
import './performance.css'
import Rating from './Ratings/Ratings'
import {createPerformanceLog} from '../../../Redux/actions/coach_to_athlete_actions'
 
import AthleteSelect from '../AthleteSelect/AthleteSelect'

class PerformanceLogs extends Component {
    constructor(props){
        super(props)

        this.state = {
            selectedAthletes : [],
            energy_rating: null,
            focus_rating: null,
            leadership_rating: null,

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

    // get the rating for each specific type and set state
    callBackRating = (rating, type) => {
        if(type == 'energy') {
            this.setState({energy_rating : rating})
        }
        else if( type == 'focus') {
            this.setState({focus_rating: rating})
        }
        else if( type == 'leadership') {
            this.setState({leadership_rating: rating})
        }
    }


    handleSubmit = () => {
        const {createPerformanceLog} = this.props
        const {energy_rating, focus_rating, leadership_rating, selectedAthletes} = this.state

        if(!energy_rating || !focus_rating || !leadership_rating || selectedAthletes.length < 1){
            console.log('error')
        }
        else {
            console.log('hi')
            createPerformanceLog(this.state)
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
                                <h1>Energy</h1>
                                {<Rating rating={this.callBackRating} type='energy'/>}
                            </div>
                            <div className='rating-card'>
                                <h1>Focus</h1>
                                {<Rating rating={this.callBackRating} type='focus' />}
                            </div>
                            <div className='rating-card'>
                                <h1>Leadership</h1>
                                {<Rating rating={this.callBackRating} type='leadership' />}
                            </div>
                        </div>
                        <AthleteSelect callBack={this.callBackSelectedAthletes} />
                        <button onClick={() => this.handleSubmit()}>Save Log</button>
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

const reduxActions = {
    createPerformanceLog
}


const myconnect = connect(mapPropsToState, reduxActions)

export default myconnect(PerformanceLogs)