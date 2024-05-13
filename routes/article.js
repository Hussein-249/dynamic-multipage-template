const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    const articleTitle = "Placeholder Article Name";
    const paragraphs = ["Some content paragraph 1.", "Some content paragraph 2.", "Some content paragraph 3."];

    res.render('article', { articleTitle, paragraphs });
});

module.exports = router;
