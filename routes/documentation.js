const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('documentation');
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

module.exports = router;
