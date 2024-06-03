/**
 * This route specfically handles image uploading.
 * The post request should only go through with a valid API key. Otherwise, useless images could be uploaded.
 * There should be no image stored that does not belong to an article.
 */

const express = require('express');
const multer = require('multer');
const path = require('path');

const router = express.Router();

const imageStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'img/uplaods/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}${path.extname(file.originalname)}`); // EDIT VIA IMAGE HANDLER
    }
});

const upload = multer({ imageStorage });

// module.exports = router;
