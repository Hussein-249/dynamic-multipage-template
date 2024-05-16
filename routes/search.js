const express = require('express');
const router = express.Router();

router.get('/:searchKeyword', (req, res) => {
    let searchResults = [];
    let validResults = false;
    let numResults = 0;

    res.render('search', { validResults, numResults });
});

module.exports = router;
