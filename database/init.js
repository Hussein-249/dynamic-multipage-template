const fs = require('fs');
const path = require('path');
require('dotenv').config();

const uri = process.env.MONGODB_URI;
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
    try {
        const client = MongoClient.connect('mongodb://localhost:27017');
        client.close();
    } catch (err) {
        throw err;
    } finally {
        fs.writeFileSync(fp, 'TRUE');
        return;
    }
}

module.exports = { init_db }
