import React, { useState } from 'react'
import ManageAthletes from './ManageAthletes/ManageAthletes'
import {useSelector} from 'react-redux'
;
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
        <div>
            admin coach
            {show ? <ManageAthletes /> : null}
            {/* <ManageAthletes /> */}
         </div>
    )
}


export default CoachDashboard
