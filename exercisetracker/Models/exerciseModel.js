const mongoose = require('mongoose')
const { Schema } = require('mongoose');

const ExerciseSchema = new Schema({
    user_id: {
        type: String,
        required: true
    },
    description: String,
    duration: Number,
    date: Date,
})

const Exercise = mongoose.model('Exercise', ExerciseSchema)
module.exports = Exercise;