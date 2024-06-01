const express = require('express');
// for draft.js
const { EditorState, convertToRaw } = require('draft-js');
const router = express.Router();


router.get('/', (req, res) => {
    // use double quotes
    let adminName = "Admin-username";
    res.render('admin', { adminName });
});


router.get('/create', (req, res) => {
    res.render('create');
});


module.exports = router;
