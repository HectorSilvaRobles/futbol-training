import React, {useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'

function AthleteSelect(props) {
    const athletes = useSelector(state => state.athletes_reducer.athletes)
    const dispatch = useDispatch()

    let athlete_select
    let athletes_to_select = []

    const handleSelect = (athlete) => {
        if(!athletes_to_select.includes(athlete._id)){
            athletes_to_select.push(athlete._id)
        } else {
            athletes_to_select = athletes_to_select.filter(e => e !== athlete._id)
        }
    } 

    const handleSubmit = () => {
        const {selectedRedux} = props
        dispatch(selectedRedux(athletes_to_select))
        
    }

    if(athletes){
        const {all_Athletes} = athletes
        athlete_select = all_Athletes.map(val => {
            return (
                <div key={val._id}>
                    <div>
                        <input type="checkbox" onClick={() => handleSelect(val)} />
                        <h1>{val.firstname[0]}.{val.lastname}</h1>
                    </div>
                </div>
            )
        })
    }
    console.log(props)

    return (
        <div>
            {athlete_select}
            <button onClick={() => handleSubmit()}>Submit</button>
        </div>
    )
}

export default AthleteSelect
