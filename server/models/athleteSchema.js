const mongoose = require('mongoose')

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
    }
})

const Athletes = mongoose.model('Athlete', athleteSchema)

module.exports = {Athletes}