const multer = require('multer');

module.exports.uploadImage = (name) => {
    console.log("upload image")
    const storage = multer.diskStorage({
        destination: function(req, file, cb) {
            cb(null, `uploads/`)
        },
        filename: function(req, file, cb) {
            console.log("filename function:", file.originalname)
            const unique = Date.now() + '_' + Math.round(Math.random() * 1E9);
            cb(null, unique + '-' + file.originalname);
        }
    })
    const upload = multer({ storage })
    return upload.single(name)
}