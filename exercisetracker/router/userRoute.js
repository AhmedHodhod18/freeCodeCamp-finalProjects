const express = require('express');
const router = express.Router()
const {
    getUser,
    createUser,
    createExercise,
    getUserExercisesById
} = require('../services/userService')



router.route('/').get(getUser).post(createUser)
router.route('/:_id/logs').get(getUserExercisesById)
router.route('/:_id/exercises').post(createExercise);

module.exports = router;