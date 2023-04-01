const commentModel = require('../models/comment.model');
const pinModel = require('../models/pin.model');

exports.addComment = async(req, res) => {
    const { comment, pinId } = req.body;

    const addedComment = await commentModel.create({ userId: req.userId, comment: comment })
    await addedComment.save();
    const addIntoPin = await pinModel.findByIdAndUpdate(pinId, {
        $push: {
            comments: addedComment
        }
    })
    res.status(200).json({ message: "comment add " })

}
module.exports.getComment = async(req, res) => {
    const { commentId } = req.params;
    const comment = await commentModel.findById(commentId).populate('userId')
    res.status(200).json({ comment })
}
exports.deleteComment = async(req, res) => {
    const { commentId } = req.params;
    const { pinId } = req.body;

    const comment = await commentModel.findById(commentId)
    if (String(req.userId) != String(comment.userId)) {
        return res.status(401).json({ message: "unauthorized" })
    }
    const pin = await pinModel.findByIdAndUpdate(pinId, {
        $pull: { comments: commentId }
    })
    const deletedComment = await commentModel.findByIdAndDelete(commentId)
    res.status(200).json({ message: "comment deleted " })
}