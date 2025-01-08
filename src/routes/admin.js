const express = require('express');
const router = express.Router();

const { publishArticle,
        getAllPublishedArticles,
        getAllDraftArticles
        } = require('../modules/database/query_handler');

const { getServerUptime,
        getHostUptime,
        } = require('../modules/analytics/analytics_engine');


router.get('/', (req, res) => {
    // use double quotes
    const adminName = "Stranger";
    const serverUptime = getServerUptime();
    const hostUptime = getHostUptime();
    res.render('admin', { adminName, serverUptime, hostUptime });
});


router.get('/create', (req, res) => {
    res.render('admin/create');
});


router.get('/posts', (req, res) => {
    const articles = getAllPublishedArticles();
    const drafts = getAllDraftArticles();
    const numArticles = articles.length;
    const numDrafts = drafts.length;

    res.render('admin/posts', { articles, drafts, numArticles, numDrafts });
});


router.post('/publish-post', async (req, res) => {
    await publishArticle(req.body)
});


module.exports = router;
