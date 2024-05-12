const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    const articleTitle = "Placeholder Article Name";
    res.render('article', { articleTitle });
});

module.exports = router;