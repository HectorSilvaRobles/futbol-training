import React, { Component } from 'react'
import {connect} from 'react-redux'
import {getAllAthletes} from '../../Redux/actions/athlete_actions'
import {Accordion} from 'react-bootstrap'
import {FaStar} from 'react-icons/fa'
import ReactPlayer from 'react-player'

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


    // Render each of the athlete's Coach posts
    coachPosts = () => {
        const {athlete} = this.state
        if(athlete){
            let {coach_posts} = athlete
            let coach_posts_cards
            // coach_posts = coach_posts.reverse()
            if(coach_posts.length > 0){
                coach_posts_cards = coach_posts.map((val) => {
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
            } else {
                return <div>No Coach Posts</div>
            }
            return (
                <div className='coach-posts'>
                    <h1>{athlete.firstname}'s Newsfeed</h1>
                    {coach_posts_cards}
                </div>
            )
        }
    }


    // Render all the performance logs
    performanceLogs =() => {
        const {athlete} = this.state
        return (
            <div className='performance-accordion-component'>
                <h1>{athlete.firstname}'s Performance</h1>
                <Accordion defaultActiveKey={0}>
                    {athlete.performance_logs.map((val, index) => {
                            return (
                                <div className='performance-accordion' key={index}>
                                    <Accordion.Toggle eventKey={index} className='performance-accordion-header'>
                                        <h1>{val.date_of_post}</h1>
                                        <h2>By Coach {val.coach_writer}</h2>
                                    </Accordion.Toggle>
                                    <Accordion.Collapse eventKey={index}>
                                        <div className='performance-card-area'>
                                            <div className='performance-card'>
                                                <h1>Energy</h1>
                                                <div>
                                                    {[...Array(5)].map((value, index) => {
                                                        return (
                                                            <FaStar
                                                                size={50}
                                                                key={index}
                                                                color={val.energy_rating >= index ? '#C13540' : 'black'}
                                                                className='rating-star-read' 
                                                            />

                                                        )
                                                    })}
                                                </div>
                                            </div>
                                            <div className='performance-card'>
                                                <h1>Focus</h1>
                                                <div>
                                                    {[...Array(5)].map((value, index) => {
                                                        return (
                                                            <FaStar
                                                                size={50}
                                                                key={index}
                                                                color={val.focus_rating >= index ? '#C13540' : 'black'}
                                                                className='rating-star-read' 
                                                            />

                                                        )
                                                    })}
                                                </div>
                                            </div>
                                            <div className='performance-card'>
                                                <h1>Leadership</h1>
                                                <div>
                                                    {[...Array(5)].map((value, index) => {
                                                        return (
                                                            <FaStar
                                                                size={50}
                                                                key={index}
                                                                color={val.leadership_rating >= index ? '#C13540' : 'black'}
                                                                className='rating-star-read' 
                                                            />

                                                        )
                                                    })}
                                                </div>
                                            </div>
                                        </div>
                                    </Accordion.Collapse>
                                </div>
                            )
                        })
                    }
                </Accordion>
            </div>
        )
    }


    highlightsRender = () => {
        const {athlete} = this.state
        console.log(athlete.highlights)
        return (
            <div className="highlight-area">
                <h1>{athlete.firstname}'s Highlights</h1>
                {athlete.highlights ?
                <div className='highlights-go-here'>
                    {athlete.highlights.map((val, index) => {
                        return (
                            <div className='highlight-container' key={index} >
                                <ReactPlayer className='react-player' url={val.video_link} controls={true} height='100%' width='100%' />
                            </div>
                        )
                    })}
                 </div>
                : 
                <div>This athlete has no highlights</div>
                }
            </div>
        )
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
                    {this.state.performance_logs ? this.performanceLogs() : null}
                    {this.state.highlights ? this.highlightsRender() : null}
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
