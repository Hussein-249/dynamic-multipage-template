const express = require('express');
const router = express.Router();

const { publishArticle } = require('../database/query_handler');
const { getServerUptime,
        getHostUptime
 } = require('../analytics/analytics_engine');


router.get('/', (req, res) => {
    // use double quotes
    const adminName = "Admin-username";
    const serverUptime = getServerUptime();
    const hostUptime = getHostUptime();
    res.render('admin', { adminName, serverUptime, hostUptime });
});


router.get('/create', (req, res) => {
    res.render('admin/create');
});


router.post('/publish-post', async (req, res) => {
    await publishArticle(req.body)
});


module.exports = router;
