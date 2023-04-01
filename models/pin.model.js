const mongoose = require('mongoose');


const pinSchema = mongoose.Schema({

    title: String,
    about: String,
    destination: String,
    category: String,
    image: String,
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "shareMe_user"
    },
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "shareMe_postedBy"
    },
    save: [mongoose.Schema.Types.ObjectId],
    comments: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'shareMe_user'
    },


}, { timestamps: true })

module.exports = mongoose.model('shareMe_pin', pinSchema);