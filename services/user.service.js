const userModel = require('../models/user.model');
const jwt_decode = require('jwt-decode');
const { catchAsyncError } = require('../util/catchAsync');

console.log("welcome to User Route")
module.exports.LoginJWT = catchAsyncError(async(req, res) => {
    const { email, name, picture } = jwt_decode(req.body.JWT)
    if (!email || !name) {
        return res.status(403).json({ message: 'Something went wrong' })
    }
    if (!userModel.find({ email })) {
        await userModel.create({
            email: email,
            name: name,
            image: picture
        })
        console.log('new User created')
    }
    res.status(200).json({ message: 'Login successfully' })
})
module.exports.userInfo = catchAsyncError(async(req, res) => {
    const user = await userModel.find({ email: req.email })
    res.status(200).json({ user })
})