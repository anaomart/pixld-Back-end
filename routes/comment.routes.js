const { addComment, getComment, deleteComment } = require('../services/comment.service');

const router = require('express').Router()
console.log('comment route')

router.post('/', addComment)
router.get('/getComment/:commentId', getComment)
router.delete('/:commentId', deleteComment)

module.exports = router;