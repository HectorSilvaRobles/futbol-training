import React, { Component } from 'react'
import {useSelector} from 'react-redux'


function AthletesPage(props) {
    const athletes = useSelector(state => state.athletes_reducer.athletes)
    if(athletes){
        const {all_Athletes} = athletes

        // athlete cards that will display each athletes name, picture, position, with a 'view profile' button
        var athleteCards = all_Athletes.map((val, index) => {
            return (
                <div key={index}>
                    <h1>{val.firstname}</h1>
                </div>
            )
        })
    }
    return (
        <div>
            Athletes Page
            {athleteCards}
        </div>
    )
}

export default AthletesPage
