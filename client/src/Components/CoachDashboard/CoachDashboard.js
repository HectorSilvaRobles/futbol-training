import React from 'react'
import ManageAthletes from './ManageAthletes/ManageAthletes'
import CoachPosts from './CoachPosts/CoachPosts'
import PerformanceLogs from './PerformanceLogs/PerformanceLogs'
import {useSelector} from 'react-redux'

import AccordionComp from '../Accordion/Accordion'

function CoachDashboard (props){
    // Check if coach user is 'Admin' in account role
    const coach_user = useSelector(state => state.coach_user)
    const {userData} = coach_user;
    let show = false

    if(userData){
        const {accountRole} = userData
        if(accountRole == "Admin"){
            show = true
        }
    }

    return (
        <div className='coach-dashboard'>
            admin coach
            <AccordionComp 
                coachPostTitle='Coach Post' 
                coachPostContent={<CoachPosts />}

                performanceTitle='Log Performance'
                performanceContent={<PerformanceLogs />}

                highlightsTitle='Upload Highlights'
                highlightsContent='highlight content goes here'

                adminShow={show}
                manageAthleteTitle='Manage Athletes'
                manageAthleteContent={<ManageAthletes />}
            
            />
           
         </div>
    )
}


export default CoachDashboard
