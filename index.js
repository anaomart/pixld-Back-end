process.on('uncaughtException', (err) => console.error('uncaughtException', err))
const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');
const DB_Connection = require('./util/DB_Connection');
const PORT = process.env.PORT || 3000;
const userRoute = require('./routes/user.routes')
const pinRoute = require('./routes/pin.routes');
const commentRoute = require('./routes/comment.routes');
const { verify } = require('./middleware/verify');
const globalMiddleWareError = require('./util/globalMiddleWareError');

// middle wares
app.use(cors())
app.use(express.json())
app.use(express.static('uploads'));
// routes
app.use('/user', userRoute)
app.use('/pin', verify, pinRoute)
app.use('/comment', verify, commentRoute)
app.use(globalMiddleWareError);
//
DB_Connection();
app.listen(PORT, () => console.log("Listening on port: " + PORT))
process.on('uncaughtException', (err) => console.log(err))