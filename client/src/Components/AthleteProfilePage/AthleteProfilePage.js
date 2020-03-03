import React, { Component } from 'react'
import {connect} from 'react-redux'
import {getAllAthletes} from '../../Redux/actions/athlete_actions'
import './athleteprofilepage.css'

export class AthleteProfilePage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            athlete: null,
            coach_posts: true,
            performance_logs: false,
            highlights: false
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


    // Coach posts
    coachPosts = () => {
        const {athlete} = this.state

        if(athlete){
            const {coach_posts} = athlete
            const coach_posts_cards = coach_posts.map((val) => {
                const {coach_writer, coach_profile_pic, coach_message, type_of_post, date_of_post} = val
                return (
                    <div className='coach_posts_card' key={val._id}>
                        <div className='coach_posts_card_header'>
                            <img src={coach_profile_pic} />
                            <h1>Coach {coach_writer}</h1>
                        </div>
                        <div className='coach_posts_card_content'>
                            <div className='cpcc_upper'>
                                <h1>{type_of_post}</h1>
                                <h2>{date_of_post}</h2>
                            </div>
                            <div className='cpcc_lower'>
                                <p>{coach_message}</p>
                            </div>
                        </div>
                    </div>
                )
            })

            return coach_posts_cards;
        }

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
                    <button className={this.state.coach_posts ? 'profile-options-button-active':'profile-options-button'} onClick={() => this.setState({coach_posts: true, performance_logs: false, highlights: false})}>Newsfeed</button>
                    <button className={this.state.performance_logs ? 'profile-options-button-active':'profile-options-button'} onClick={() => this.setState({performance_logs: true, coach_posts: false, highlights: false})}>Perfromance</button>
                    <button className={this.state.highlights ? 'profile-options-button-active':'profile-options-button'} onClick={() => this.setState({highlights: true, performance_logs: false, coach_posts: false})}>Highlights</button>
                </div>

                <div className='profile-content-area'>
                    {this.state.coach_posts ? this.coachPosts() : null}
                    {this.state.performance_logs ? <div>Performance</div> : null}
                    {this.state.highlights ? <div>Highlights</div> : null}

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
