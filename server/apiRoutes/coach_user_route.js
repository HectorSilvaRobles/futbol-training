const express = require('express');
const router = express.Router();
const {coachUser} = require('../models/coachSchema');


// Register new coach user (api endpoint)
router.post('/register', (req, res) => {
    const coach_user = new coachUser(req.body);

    coach_user.save((err, doc) => {
        if(err){
            return res.send('there was an error with creating new user', err)
        }

        return res.status(200).json({
            success: true,
            new_user: coach_user
        })
    })
})





module.exports = router;