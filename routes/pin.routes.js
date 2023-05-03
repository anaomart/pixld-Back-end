const { getPin, deletePin, savePin, getAllPins, addPin, pinDetails, getUserPins } = require('../services/pins.service');
const { uploadImage } = require('../util/imageUpload');

const router = require('express').Router();


router.get("/", getAllPins)
router.get("/:pinId", pinDetails)
router.post("/addPin", uploadImage('image'), addPin)
router.put('/save/:pinId', savePin)
router.get("/save", getUserPins)
router.delete('/:pinId', deletePin)
router.get('/category/:category', getPin)
module.exports = router;