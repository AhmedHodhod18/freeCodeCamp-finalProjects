const User = require('../Models/userModel')
const Exercise = require('../Models/exerciseModel')


const getUser = async (req, res) => {
    const users = await User.find({}).select('_id username');
    if (!users) {
        res.send('No users')
    } else {
        res.json(users)
    }
}

const createUser = async (req, res) => {
    const userObj = new User({
        username: req.body.username
    })
    try{
        const user = await userObj.save()
        console.log(user);
        res.json(user)
    }catch(err){
        console.log(err)
    }
}

const createExercise = async (req, res) => {
    const id = req.params._id
    const { description, duration, date } = req.body
    try {
        const user = await User.findById(id)
        if (!user) {
            res.send('Could not find user')
        } else {
        const exerciseObj = new Exercise({
            user_id: user._id,
            description,
            duration,
            date: date ? new Date(date) : new Date(),
        })
        const exercise = await exerciseObj.save()
        res.json({
            _id: user._id,
            username: user.username,
            description: exercise.description,
            duration: exercise.duration,
            date: new Date(exercise.date).toDateString()
        })
    }
} catch (err) {
    console.log(err);
    res.send('There was an error saving the exercise')
    }
}

const getUserExercisesById = async (req, res) => {
    const {from, to, limit} = req.query;
    const id = req.params._id
    const user = await User.findById(id)
    if (!user) {
        res.send('Could not find user')
        return;
    }
    let dateObj = {}
    if (from) {
        dateObj['$gte'] = new Date(from)
    }
    if (to){
        dateObj["$lte"] = new Date(to)
    }
    let filter = {
        user_id: id
    }
    if(from || to){
        filter.date = dateObj;
    }
    const exercises = await Exercise.find(filter).limit(+limit ?? 500)
    const log = exercises.map(e => ({
        description: e.description,
        duration: e.duration,
        date: e.date.toDateString()
    }))
    
    res.json({
        username: user.username,
        count: exercises.length,
        _id: user._id,
        log
    })
}

module.exports = {
    getUser,
    createUser,
    createExercise,
    getUserExercisesById
}