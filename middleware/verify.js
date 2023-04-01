const jwt_decode = require("jwt-decode")
const userModel = require("../models/user.model")
module.exports.verify = async(req, res, next) => {
    let jwt = req.header('Authorization')
    if (!jwt) {
        return res.status(401).json({ message: "unauthorized" })
    }
    jwt = jwt.split(' ')[1]
    const { email, name, picture } = jwt_decode(jwt)
    const exist = await userModel.findOne({ email })
    if (!exist) {
        return res.status(403).json({ message: "user not found" })
    } else {
        console.log(exist)
        req.userId = exist._id
        req.email = email
        req.name = name
        req.picture = picture
        next();
    }
}