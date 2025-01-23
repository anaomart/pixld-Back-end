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
var bodyParser = require('body-parser');

// CORS configuration
const corsOptions = {
    origin: 'https://share-me-seven.vercel.app', // Allow only this domain
    methods: 'GET,POST,OPTIONS,PUT,PATCH,DELETE', // Allowed HTTP methods
    allowedHeaders: 'X-Requested-With,content-type,Authorization', // Allowed headers
    credentials: true // Allow credentials (cookies, authorization headers, etc.)
};

// middle wares
app.use(cors(corsOptions));

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({
    limit: '50mb',
    extended: true,
    parameterLimit: 50000
}));

app.use(express.static('uploads'));

// routes
app.get('/ssl', (req, res) => {
    console.log('ssl certificate');
    res.redirect('https://www.pixld.agency');
});

app.get('/test', (req, res) => {
    console.log('test working');
    res.json({ message: 'test working' });
});

app.use('/user', userRoute);
app.use('/pin', verify, pinRoute);
app.use('/comment', verify, commentRoute);

// global error handlers
app.use(globalMiddleWareError);

// Database connection
DB_Connection();

app.listen(PORT, () => console.log("Listening on port: " + PORT));

process.on('uncaughtException', (err) => console.log(err));
