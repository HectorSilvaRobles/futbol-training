import React, { useState } from 'react'
import ManageAthletes from './ManageAthletes/ManageAthletes'
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
                coachPostContent='coach posts will go here'

                performanceTitle='Log Performance'
                performanceContent='log performances here'

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
