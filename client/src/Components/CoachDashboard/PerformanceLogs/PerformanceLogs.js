import React, {Component} from 'react'
import {connect} from 'react-redux';
import './performance.css'
import {FaStar} from 'react-icons/fa'

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

        const starRating = (
            <div>
                {[...Array(5)].map((star, i) => {
                    const ratingValue = i + 1

                    return (
                        <label>
                            <input 
                                type='radio' 
                                value={ratingValue} 
                                onClick={() => this.setState({energy_rating: ratingValue})}
                                
                                className='star-radio' 
                            />
                            <FaStar 
                                className='rating-star' 
                                color={ratingValue <= (this.state.energy_rating_hover || this.state.energy_rating) ? 'yellow' : "grey"} 
                                size={80} 
                                onMouseEnter={() => this.setState({energy_rating_hover: ratingValue})}
                                onMouseLeave={() => this.setState({energy_rating_hover: null})}
                            />
                        </label>
                    )
                })}
            </div>
        )
        console.log(this.state)
        
        
        return (
            <div>
                {userData ? 
                    <div className='performance-log-admin'>
                        <div className='performance-log-rating'>
                            <div className='rating-card'>
                                {starRating}
                            </div>
                            <div className='rating-card'>

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