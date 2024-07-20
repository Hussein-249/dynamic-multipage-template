const express = require('express');
const router = express.Router();

const { dualConsoleError } = require('../debug/master_log');

const { getPage, getParagraphsFromPage, getHeadersFromPage } = require('../database/query_handler');


router.get(['/', '/help'], async (req, res) => {
    let paragraphs = [];
    let numParagraphs = 0;
    let headers = [];

    // use double quotes
    let pageTitle = "About";
    try {
        pageObj = await getPage(pageTitle);
        if (pageObj) {
            pageTitle = pageObj.title;
            paragraphs = await getParagraphsFromPage(pageObj);
            numParagraphs = paragraphs.length;
            headers = await getHeadersFromPage(pageObj);
        } else {
            const errorCode = 404;
            const errorMessage = 'Hmm, we couldn\'t find that page. Maybe it was renamed or deleted?';
            return res.status(errorCode).render('error', { errorMessage, errorCode})
        }
    } catch (error) {
        dualConsoleError(error);
        const errorCode = 500;
        const errorMessage = 'Hmm, we\'ve encountered an error while trying to find that page.';
        return res.status(errorCode).render('error', { errorMessage, errorCode})
    }
    res.render('about', { pageTitle, paragraphs, numParagraphs, headers });
});


router.get('/:pageName', async (req, res) => {
    let paragraphs = [];
    let numParagraphs = 0;
    let headers = [];
    try {
        pageObj = await getPage(req.params.pageName);
        if (pageObj) {
            pageTitle = pageObj.title;
            paragraphs = await getParagraphsFromPage(pageObj);
            numParagraphs = paragraphs.length;
            headers = await getHeadersFromPage(pageObj);

        } else {
            const errorCode = 404;
            const errorMessage = 'Hmm, we couldn\'t find that page. Maybe it was renamed or deleted?';
            return res.status(errorCode).render('error', { errorMessage, errorCode})
        }
    } catch (error) {
        dualConsoleError(error);
        const errorCode = 500;
        const errorMessage = 'Hmm, we\'ve encountered an error while trying to find that page.';
        return res.status(errorCode).render('error', { errorMessage, errorCode})
    }
    res.render('about', { pageTitle, paragraphs, numParagraphs, headers});
});


module.exports = router;
