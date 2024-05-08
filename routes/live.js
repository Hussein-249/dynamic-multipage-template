const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('live');
});

module.exports = router;
