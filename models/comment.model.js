const mongoose = require('mongoose');


const commentSchema = mongoose.Schema({

    userId: {
        type: mongoose.Types.ObjectId,
        ref: "shareMe_user"
    },
    comment: String
}, { timestamps: true })

module.exports = mongoose.model('shareMe_comment', commentSchema);