const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    let liveUpdateMessages = [];
    let liveTopic = '';
    let numMessages = liveUpdateMessages.length;

    res.render('live', { liveUpdateMessages, numMessages, liveTopic });
});

module.exports = router;
