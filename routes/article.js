const express = require('express');
const router = express.Router();

// import modules from code
const { getParagraphsFromArticle, getArticle } = require('../database/query_handler');

router.get('/', (req, res) => {
    const articleTitle = "Placeholder Article Name";
    const paragraphs = ["Some content paragraph 1.", "Some content paragraph 2.", "Some content paragraph 3."];
    const numParagraphs = 5;

    res.render('article', { articleTitle, paragraphs, numParagraphs });
});


router.get('/:articleName', async (req, res) => {
    let paragraphs = [];
    let numParagraphs = 0;

    try {

        articleObj = await getArticle(req.params.articleName);
        articleTitle = articleObj.article_name;
        paragraphs = await getParagraphsFromArticle(articleTitle);
        numParagraphs = paragraphs.length;

    } catch (error) {
        console.log('Cannot find or render article content.\n', error);

    } finally { res.render('article', { articleTitle, paragraphs, numParagraphs }); }
});

module.exports = router;
