process.on('uncaughtException', (err) => console.error('uncaughtException', err))
const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');
const DB_Connection = require('./util/DB_Connection');
const PORT = process.env.PORT || 3002;
const userRoute = require('./routes/user.routes')
const pinRoute = require('./routes/pin.routes');
const commentRoute = require('./routes/comment.routes');
const { verify } = require('./middleware/verify');
var bodyParser = require('body-parser');
const globalMiddleWareError = require('./util/globalMiddleWareError');


// Put these statements before you define any routes.

app.use(cors())
app.use(express.json())
app.use(express.static('uploads'))

app.use('/user', userRoute)
app.use('/pin', verify, pinRoute)
app.use('/comment', verify, commentRoute)
app.use(globalMiddleWareError)

DB_Connection();
app.listen(PORT, () => console.log("Listening on port: " + PORT))
process.on('uncaughtException', (err) => console.log(err))