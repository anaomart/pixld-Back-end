const mongoose = require('mongoose');


const postedBySchema = mongoose.Schema({

    name: String,
    email: String,
    image: String


})

module.exports = mongoose.model('shareMe_postedBy', postedBySchema);