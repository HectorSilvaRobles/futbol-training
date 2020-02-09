import React, { Component } from 'react'
import {connect} from 'react-redux'
import {getAllAthletes} from '../../Redux/actions/athlete_actions'
import './athleteprofilepage.css'

export class AthleteProfilePage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            athlete: null,
            
        }
    }

    componentDidMount = ( ) => {
        const athlete_id = this.props.match.params.id

        const {getAllAthletes} = this.props
        getAllAthletes()
        .then(res => {
            let all_athletes = res.payload.all_Athletes
            all_athletes.map(val => {
                if(val._id == athlete_id){
                    this.setState({athlete: val})
                }
            })
        })
    }

    handleDisplayAthlete =() => {
        const {athlete} = this.state
        return (
            <div className='athlete-profile'>
                <div className='profile-header'>
                    <div className='profile-header-image'>
                        <img src={athlete.athlete_pic} alt='athlete profile pic' />
                    </div>
                    <div className='profile-header-info'>
                        <h1>{athlete.firstname} {athlete.lastname}</h1>
                        <h2>Position: {athlete.position}</h2>
                        <h3>Age: {athlete.age}</h3>
                    </div>
                </div>
                <div className='profile-options'>

                </div>
            </div>
        )
    }

    render() {
        const {athlete} = this.state
        return (
            <div className='athlete-profile-main'>
                {athlete ? this.handleDisplayAthlete() : null}
            </div>
        )
    }
}

const mapStateToProps = (reduxState) => {
    return reduxState
}

export default connect(mapStateToProps, {getAllAthletes})(AthleteProfilePage)
