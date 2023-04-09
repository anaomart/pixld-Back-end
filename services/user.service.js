const userModel = require('../models/user.model');
const jwt_decode = require('jwt-decode');
const { catchAsyncError } = require('../util/catchAsync');

module.exports.LoginJWT = catchAsyncError(async(req, res) => {
    console.log("login ")
    const { email, name, picture } = jwt_decode(req.body.JWT)

    if (!email || !name) {
        return res.status(403).json({ message: 'Something went wrong' })
    }
    const exists = await userModel.find({ email });

    if (exists) {
        const user = await userModel.insertMany({ email, name, image: picture })
    }
    res.status(200).json({ message: 'Login successfully' })
})
module.exports.userInfo = catchAsyncError(async(req, res) => {
    const user = await userModel.find({ email: req.email })
    res.status(200).json({ user })
})