const mongoose = require('mongoose')
const { Schema } = require('mongoose');

const UserSchema = new Schema({
  username: String,
})

const User = mongoose.model('User', UserSchema)
module.exports = User;