const express = require('express');
const router = express.Router();
const feedbackService = require("../services/feedbackService");
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../uploads')); 
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname); 
    }
});
const upload = multer({ storage });

router.use('/uploads', express.static(path.join(__dirname, '../uploads')));

router.post('/upload', upload.single('file'), feedbackService.uploadFeedback);

router.get('/fetch', feedbackService.fetchFeedback);

module.exports = router;
