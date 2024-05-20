const express = require('express');
const path = require('path');
const fs = require('fs');

const retrieve = require('../docs/retrieve_docs')

const router = express.Router();

router.get('/', (req, res) => {
    const docJSONObj = retrieve.retreive_docs_as_JSON();

    const doctype = "JSON";

    const sections = docJSONObj.sections;

    const keys = Object.keys(sections);

    res.render('documentation', { keys, sections });
});

router.get('/markdown', (req, res) => {
    const docPath = path.join(__dirname, '../docs/documentation.md');
    fs.readFile(docPath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Error reading documentation');
        }
        res.render('documentation', { content: data, format: 'markdown' });
    });
});


router.get('/plaintext', (req, res) => {
    const docPath = path.join(__dirname, '../docs/documentation.txt');
    fs.readFile(docPath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Error reading documentation');
        }
        res.setHeader('Content-Type', 'text/plain');
        res.send(data);
    });
});

module.exports = router;
