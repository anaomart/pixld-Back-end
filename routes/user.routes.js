const { verify } = require('../middleware/verify');
const { LoginJWT, userInfo } = require('../services/user.service');

const router = require('express').Router();

router.post('/login', LoginJWT)
router.get('/userInfo', verify, userInfo)

module.exports = router