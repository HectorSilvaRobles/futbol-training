import React, {useState} from 'react'
import {useSelector} from 'react-redux'

function AthleteSelect(props) {
    const athletes = useSelector(state => state.athletes_reducer.athletes)
    const {callBack} = props;
    let athlete_select

    const handleSelect = (athlete) => {
        callBack(athlete._id)
    } 

    // Athlete select options
    if(athletes){
        const {all_Athletes} = athletes
        athlete_select = all_Athletes.map(val => {
            return (
                <div key={val._id}>
                    <div>
                        <input type="checkbox" onClick={() => handleSelect(val)} />
                        <h1>{val.firstname[0]}. {val.lastname}</h1>
                    </div>
                </div>
            )
        })
    }

    return (
        <div>
            {athlete_select}
        </div>
    )
}

export default AthleteSelect
