const express = require('express');
const router = express.Router();

// import modules from code
const { getParagraphsFromArticle, getArticle } = require('../database/query_handler');


router.get('/:articleTitle', async (req, res) => {
    let paragraphs = [];
    let numParagraphs = 0;
    let imageCaption = '';
    let datePublished = '';
    let dateModified = '';
    try {
        articleObj = await getArticle(req.params.articleTitle);
        if (articleObj) {
            articleTitle = articleObj.article_title;
            title = articleTitle.replaceAll('-', ' ');
            authorString = articleObj.metadata.author_fname + ' ' + articleObj.metadata.author_lname[0] + '.';
            datePublished = new Date(articleObj.metadata.date_published);
            datePublished = `${datePublished.getFullYear()}-${String(datePublished.getMonth() + 1).padStart(2, '0')}-${String(datePublished.getDate()).padStart(2, '0')}, ${String(datePublished.getHours()).padStart(2, '0')}:${String(datePublished.getMinutes()).padStart(2, '0')}`;
            dateModified = new Date(articleObj.metadata.date_modified);
            dateModified = `${dateModified.getFullYear()}-${String(dateModified.getMonth() + 1).padStart(2, '0')}-${String(dateModified.getDate()).padStart(2, '0')}, ${String(dateModified.getHours()).padStart(2, '0')}:${String(dateModified.getMinutes()).padStart(2, '0')}`;
            paragraphs = await getParagraphsFromArticle(articleTitle);
            numParagraphs = paragraphs.length;
        } else {
            const errorCode = 404;
            const errorMessage = 'Hmm, we couldn\'t find that article. Maybe it was renamed or deleted?';
            return res.status(errorCode).render('error', { errorMessage, errorCode})
        }

        res.render('article', { title, paragraphs, numParagraphs, imageCaption, authorString, datePublished, dateModified}); 
    } catch (error) {
        console.log('Cannot find or render article content.\n', error);
        const errorCode = 500;
        const errorMessage = 'Hmm, we\'ve encountered an error while trying to find that article. Maybe it was renamed or deleted?';
        return res.status(errorCode).render('error', { errorMessage, errorCode})
    }
});

module.exports = router;
