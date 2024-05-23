const express = require('express');
const router = express.Router();
const { searchArticles } = require('../database/query_handler');


// callback function must be async due to database query
router.get('/:searchKeyword', async (req, res) => {
    let searchResults = [];

    try {
        searchResults = await searchArticles(req.params.searchKeyword);

    } catch (error) {
        console.error(error)
    }
    let numResults = searchResults.length;

    res.render('search', { numResults, searchResults });
});

module.exports = router;
