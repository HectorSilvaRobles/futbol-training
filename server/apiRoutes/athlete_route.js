const express = require('express');
const router = express.Router();
const {Athletes} = require('../models/athleteSchema');


// Adding new athlete to database endpoint
router.post('/add-athlete', (req, res) => {
    // creating a new athlete
    const athlete = new Athletes(req.body)

    athlete.save((err, doc) => {
        if(err){
            return res.status(400).json({
                message: 'Could not add new athlete to database',
                error: err
            })
        }

        return res.status(200).json({
            success: true,
            new_athlete: athlete
        })
    })
})


// Removing Athelte from database, endpoint
router.delete('/remove-athlete/:id', (req, res) => {
    Athletes.findById(req.params.id)
    .then(athlete => athlete.remove()
        .then(() => res.status(200).json({
            success: true,
            removedAthlete: athlete
            })
        )
        .catch(err => res.status(400).json({
            success: false,
            error: err
        }))
    )
    .catch(err => res.status(400).json({
        success: false,
        error: err
    }))
})


// Getting all athletes in Athlete schema in database, endpoint
router.get('/all-athletes', (req, res) => {
    Athletes.find()
        .then(athletes => res.status(200).json({
            success: true,
            all_Athletes: athletes
        }))
})


module.exports = router