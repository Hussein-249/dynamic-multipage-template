/**
 * This route specfically handles image uploading.
 * The post request should only go through with a valid API key. Otherwise, useless images could be uploaded.
 * There should be no image stored that does not belong to an article.
 */

const express = require('express');
const multer = require('multer');
const path = require('path');

const router = express.Router();

const KEY = process.env.UPLOAD_KEY

const imageStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'img/uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}${path.extname(file.originalname)}`); // EDIT VIA IMAGE HANDLER
    }
});

router.post('/upload/image', upload.single('image'), (req, res) => {
    
    const apiKey = req.headers['upload-api-key'];

    if (apiKey !== KEY) {
        return res.status(401).json({ error: 'Invalid API key' });
    }

});

const upload = multer({ imageStorage });

module.exports = router;
