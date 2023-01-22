const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'views/cdn')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
});
const imageFilter = (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};
const limits = {
    fileSize: 1024 * 1024  // 1MB
};
const upload = multer({ 
    storage,
    fileFilter: imageFilter,
    limits 
});

const fileUpload = upload.single('thumbnail');
const checkFile = (req, res, next) => {
  if (!req.file) {
      return res.status(400).json({error: 'A file is required'});
  }
  next();
};

module.exports = { checkFile, fileUpload};
