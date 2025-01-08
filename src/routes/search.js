const express = require('express');
const router = express.Router();
const { searchArticles } = require('../modules/database/query_handler');
const { dualConsoleError } = require('../debug/master_log');


// callback function must be async due to database query
router.get('/:searchKeyword', async (req, res) => {
    let searchResults = [];
    let searchParam = '';

    try {
        searchParam = req.params.searchKeyword

        searchResults = await searchArticles(searchParam);

    } catch (error) { dualConsoleError(error) }

    let numResults = searchResults.length;

    res.render('search', { numResults, searchResults, url: require('url'), searchParam  });
});

module.exports = router;
