const mongoose = require('mongoose');


const userSchema = mongoose.Schema({

    name: String,
    email: String,
    image: String,
    saved: [mongoose.Types.ObjectId]

}, { timestamp: true })

module.exports = mongoose.model('shareMe_user', userSchema);