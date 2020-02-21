const mongoose = require('mongoose');

const coachPostsSchema = mongoose.Schema({
    coach_writer: {
        type : String,
    },
    coach_profile_pic : {
        type: String
    },
    date_of_post : {
        type: String
    },
    coach_message : {
        type: String,
        maxlength: 290,
        minglength: 10
    },
    type_of_post : {
        type: String,
    }
})

const performanceLog = mongoose.Schema({
    coach_writer: {
        type: String
    },
    date_of_post : {
        type: String
    },
    leadership_level : {
        type: Number
    },
    focus_level : {
        type: Number
    },
    energy_level: {
        type: Number
    }
})

const athleteSchema = mongoose.Schema({
    athlete_pic: {
        type: String
    },
    lastname: {
        type: String,
        maxlength: 70
    },
    firstname: {
        type: String,
        maxlength: 70
    },
    position: {
        type: String
    },
    age: {
        type: Number
    }, 
    coach_posts: [coachPostsSchema],
    performance_logs : [performanceLog]
})

const Athletes = mongoose.model('Athlete', athleteSchema)

module.exports = {Athletes}