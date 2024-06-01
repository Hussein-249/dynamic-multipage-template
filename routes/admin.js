const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
    // use double quotes
    let adminName = "Admin-username";
    res.render('admin', { adminName });
});


router.get('/create', (req, res) => {
    res.render('create');
});


module.exports = router;
