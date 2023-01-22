const multer = require('multer');
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'views/cdn');
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    },
});
const imageFilter = (req, file, cb) => {
    if (!file.mimetype.match('image/jpeg|image/png')) {
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};


const limits = {
    fileSize: 1024 * 1024 // 1MB
};
const upload = multer({
    storage,
    fileFilter: imageFilter,
    limits
}).single('thumbnail');

const uploadFile = (req, res, next) => {
    upload(req, res, function(err) {
        if (err) {
            return res.status(400).json({
                error: err.message
            });
        }
        next();
    });
};

module.exports = uploadFile;