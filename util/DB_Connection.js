const mongoose = require('mongoose');

const CONNECTION_URL = 'mongodb://127.0.0.1:27017/shareMe'

function DB_Connection() {

    mongoose.connect(CONNECTION_URL).then(() => {
        console.log("connected to database successfully");
    })

}
module.exports = DB_Connection;