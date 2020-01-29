import React, { Component } from 'react'
import ManageAthletes from './ManageAthletes/ManageAthletes'

export class CoachDashboard extends Component {
    render() {
        return (
            <div>
                admin coach
                <ManageAthletes />
            </div>
        )
    }
}

export default CoachDashboard
