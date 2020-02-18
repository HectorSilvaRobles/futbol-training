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


// Get all request in pending list
router.get('/all-requests', (req, res) => {
    Pending.find()
    .then(requests => res.status(200).json({
        success: true,
        all_pending_requests: requests
    }))
})


// Update approve_status depending if accepted or rejected
router.put('/approve_state/:request_id', (req, res, next) => {
    const param = req.params.request_id

    Pending.findByIdAndUpdate(param, {$set : req.body }, (err, request) => {
        if(err) {
            return res.status(400).json({
                message: "Could not update the approval field",
                success: false,
                error: err
            })
        }

        return res.status(200).json({
            success: true,
            message: 'successfully updated the approval status',
            updated_request: request
        })
    })
})




module.exports = router