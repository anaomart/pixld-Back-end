process.on('uncaughtException', (err) => console.error('uncaughtException', err))
const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');
const DB_Connection = require('./util/DB_Connection');
const PORT = process.env.PORT || 4000;
const userRoute = require('./routes/user.routes')
const pinRoute = require('./routes/pin.routes');
const commentRoute = require('./routes/comment.routes');
const { verify } = require('./middleware/verify');
const globalMiddleWareError = require('./util/globalMiddleWareError');

// middle wares
app.use(cors())
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'https://pixld.agency');
    res.setHeader('Access-Control-Allow-Origin', 'https://www.pixld.agency');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});
app.use(express.json())
app.use(express.static('uploads'));
// routes
console.log("userInfo ")
app.get('/ssl', (req, res) => {
    console.log('ssl certificate')
    res.json({ message: 'ssl certificate' })
    res.redirect('https://www.pixld.agency')
})
app.get('test', (req, res) => {
    res.json({ message: 'test working' })
})
app.use('/user', userRoute)
app.use('/pin', verify, pinRoute)
app.use('/comment', verify, commentRoute);

// global error handlers
app.use(globalMiddleWareError);
//
DB_Connection();
app.listen(PORT, () => console.log("Listening on port: " + PORT))
process.on('uncaughtException', (err) => console.log(err))