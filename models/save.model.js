const mongoose = require('mongoose');


const saveSchema = mongoose.Schema({

    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "shareMe_postedBy"
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "shareMe_user"
    },

})

module.exports = mongoose.model('shareMe_save', saveSchema);