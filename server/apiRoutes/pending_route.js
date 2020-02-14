const express = require('express');
const router = express.Router();
const {Pending} = require('../models/pendingSchema')

// Send request to pending list 
router.post('/send-request', (req, res ) => {
    const newRequest = new Pending(req.body)
    
    newRequest.save((err, doc) => {
        if(err){
            return res.status(400).json({
                success: false,
                message: 'Error saving request in pending list',
                error: err
            })
        }

        return res.status(200).json({
            success: true,
            newRequest : newRequest
        })
    })
})


module.exports = router