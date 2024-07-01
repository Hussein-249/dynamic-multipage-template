const fs = require('fs');
const path = require('path');
require('dotenv').config();

const fp = path.join(__dirname, 'init_flag.txt');

function check_init() {
    try {
        const content = fs.readFileSync(fp, 'utf8');
        return content === 'TRUE';
    } catch(err) {
        console.error('Error during reading target init_flag.txt:', err);
        throw err;
    }
}

function init_db() {
    if (check_init()) return;

    fs.writeFileSync(fp, 'TRUE');
    return;
}

module.exports = { init_db }
