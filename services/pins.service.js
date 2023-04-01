const commentModel = require('../models/comment.model');
const pinModel = require('../models/pin.model')
const userModel = require('../models/user.model')
const cloudinary = require('cloudinary');
const { catchAsyncError } = require('../util/catchAsync');
cloudinary.config({
    cloud_name: 'dbhxrqn7l',
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

module.exports.getAllPins = catchAsyncError(async(req, res) => {
    const pins = await pinModel.find().populate('userId');
    res.json({ data: pins })
})

module.exports.getPin = catchAsyncError(async(req, res) => {
    const category = req.params.category
    const pins = await pinModel.find({
        $or: [
            { title: { $regex: category, $options: "i" } },
            { about: { $regex: category, $options: "i" } },
            { category: { $regex: category, $options: "i" } }
        ]
    }).populate('userId')
    res.json({ data: pins })
})
module.exports.deletePin = catchAsyncError(async(req, res) => {
    const { pinId } = req.params
    const pin = await pinModel.findById(pinId)
    if (String(req.userId) != String(pin.userId)) {
        return res.status(401).json({ message: "unauthorized" })
    }
    const deletedPin = await pinModel.findByIdAndDelete(pinId)
    res.status(200).json({ message: "Pin Delete Success" });
})
module.exports.pinDetails = catchAsyncError(async(req, res) => {
    console.log('pin details')
    const comments = []
    const { pinId } = req.params
    const pin = await pinModel.findOne({ _id: pinId }).populate('userId')
    if (!pin) {
        return res.json({ message: 'no Comments found' });
    }
    for (let i = 0; i < pin.comments.length; i++) {
        const comment = await commentModel.findById(pin.comments[i])
        if (comment) {
            const user = await userModel.findById(comment.userId)
            comments.push({ userId: user, comment: comment })
        }
    }
    const { _id, title, about, destination, category, image, userId } = pin
    res.status(200).json({ _id, title, about, destination, category, image, userId, comments });
})
module.exports.savePin = catchAsyncError(async(req, res) => {
    const { pinId } = req.params
    const user = await userModel.findOne({ email: req.email })
    const pin = await pinModel.find({ save: { $in: [user._id] }, _id: pinId })
    if (!pin.length) {
        const pins = await pinModel.findByIdAndUpdate(pinId, {
            $push: { save: user },
        })
    } else {
        const pins = await pinModel.findByIdAndUpdate(pinId, {
            $pull: { save: user._id },
        })

    }
    res.status(200).json({ message: "Pin Saved" })
})
module.exports.addPin = catchAsyncError(async(req, res) => {
    cloudinary.v2.uploader.upload(req.file.path, async(err, result) => {
        const { title, about, destination, category } = req.body;
        req.body.image = result.secure_url;
        req.body.userId = req.userId
        req.body.postedBy = req.userId;

        let pin = await pinModel.insertMany(req.body)

        res.status(200).json({ message: "pin Add successfully", pin })
    })
})
module.exports.getUserPins = catchAsyncError(async(req, res) => {
    const { userId } = req;
    const savedPins = await pinModel.find({ 'save': { $in: userId } }).populate('userId')
    const createdPins = await pinModel.find({ userId }).populate('userId')
    res.status(200).json({ savedPins, createdPins })
})