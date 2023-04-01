const { getPin, deletePin, savePin, getAllPins, addPin, pinDetails, getUserPins } = require('../services/pins.service');
const { uploadImage } = require('../util/imageUpload');

const router = require('express').Router();


router.get("/", getAllPins)
router.get("/save", getUserPins)
router.get("/:pinId", pinDetails)
router.get('/category/:category', getPin)
router.delete('/:pinId', deletePin)
router.put('/save/:pinId', savePin)
router.post("/addPin", uploadImage('image'), addPin)
module.exports = router;