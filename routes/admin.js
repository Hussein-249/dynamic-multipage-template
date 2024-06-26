const express = require('express');
const router = express.Router();

const { publishArticle } = require('../database/query_handler');


router.get('/', (req, res) => {
    // use double quotes
    let adminName = "Admin-username";
    res.render('admin', { adminName });
});


router.get('/create', (req, res) => {
    res.render('admin/create');
});


router.post('/publish-post', async (req, res) => {
    await publishArticle(req.body)
});


module.exports = router;
