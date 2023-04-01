module.exports = (err, req, res, next) => {
    console.log('Global Middleware');
    err.statusCode = err.statusCode || 500;
    res.status(err.statusCode).json({
        status: err.statusCode,
        Message: err.message,
        stack: (process.env.NODE_ENV == 'DEVELOPMENT') &&
            err.stack
    })
}