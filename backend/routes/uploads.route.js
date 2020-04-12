const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();

// Set storage engine......
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/images');
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

// Init upload......
const upload = multer({
  storage,
  limits: {fileSize: 1000000},
  fileFilter: (req, file, cb) => {
    checkFileType(file, cb);
  }
}).single('image');

// Check file type......
function checkFileType(file, cb) {
  // Allowed ext
  const filetypes = /jpeg|jpg|png|gif/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb('Error: Images Only!');
  }
}

// Upload file......
router.route('/').post(async (req, res) => {
  upload(req, res, (err) => {
    if (typeof req.file !== 'undefined') {
      res.json({
        imageUrl: 'http://localhost:3000/images/' + req.file.filename
      });
    } else {
      res.status(400).json({
        msg: 'Please upload valid file!'
      });
    }
  });
});

module.exports = router;
