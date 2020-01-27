const express = require('express');
const router = express.Router();
const {coachUser} = require('../models/coachSchema');

const {auth} = require('../middleware/auth');

// Authenticate user token 
router.get('/auth', auth, (req,res)=> {
    res.status(200).json({
        _id: req.user._id,
        isAdmin: req.user.accountRole === 'admin' ? true : false,
        isAuth: true,
        email: req.user.email,
        firstname: req.user.firstname,
        lastname: req.user.lastname,
        accountRole: req.user.accountRole,
        profile_pic: req.user.profile_pic
    })
    
})

// Register new coach user (api endpoint)
router.post('/register', (req, res) => {
    const coach_user = new coachUser(req.body);

    coach_user.save((err, doc) => {
        if(err){
            return res.status(404).json({
                message: 'there was an error with creating new user', 
                error: err
            })
        }
        return res.status(200).json({
            success: true,
            new_user: coach_user
        })
    })
})


// Login coach users (api endpoint)
router.post('/login', (req, res) => {

    // find the coach user's email
    coachUser.findOne({email: req.body.email}, (err, user)=> {
        if(!user){
            return res.status(404).json({
                loginSuccess: false,
                message: "login failed, email not found"
            })
        }

        // compare password
        user.comparePassword(req.body.password, (err, isMatch) => {
            if(!isMatch){
                return res.status(404).json({
                    loginSuccess: false,
                    message: "Login failed, wrong password entered"
                })
            }

            // Generate token
            user.generateToken((err, user) => {
                if(err){
                    return res.status(400).send(err)
                }
                res.cookie("w_authExp", user.tokenExp);
                res.cookie("w_auth", user.token).status(200).json({
                    loginSuccess: true,
                    user: user
                })
            })
        })
    })
})


// Logout user (api endpoint)
router.get('/logout', auth, (req, res) => {
    coachUser.findOneAndUpdate({_id: req.user._id}, {token: "", tokenExp: ""}, (err, doc) => {
                if(err){
                    return res.status(404).json({
                        success: false,
                        error: err
                    })
                }

                return res.status(200).send({
                    success: true,
                    message: 'successfully logged out'
                })
            }
        )
})



module.exports = router;