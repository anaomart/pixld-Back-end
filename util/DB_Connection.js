const mongoose = require('mongoose');

const CONNECTION_URL = process.env.MONGODB_URL
console.log(process.env)

function DB_Connection() {

    mongoose.connect(CONNECTION_URL).then(() => {
        console.log("connected to database successfully");
    })

}
module.exports = DB_Connection;