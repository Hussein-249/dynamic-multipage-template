/**
 * This file contains code that will load the database collection with sample data found in the sample_data folder.
 * In principle, the init check is performed on app start. If the data has already been loaded, then init_db() will be skipped.
 * Check is performed by setting a init_flag value.
 */

const fs = require('fs');
const path = require('path');
require('dotenv').config();


const uri = process.env.MONGODB_URI;
const db_name = process.env.MONGODB_DB_NAME;
const article_collection = process.env.ARTICLE_COLL;
const init_fp = path.join(__dirname, 'init_flag.txt');
const load_dir = path.join(path.dirname(__filename), '..', 'sample_data');


function check_init() {
    /**
     * Checks if init_flag.txt is TRUE.
     */

    try {
        const content = fs.readFileSync(init_fp, 'utf8');
        return content === 'TRUE';
    } catch(err) {
        console.error('Error during reading target init_flag.txt:', err);
        throw err;
    }
}


function init_db() {
    /**
     * Loads sample data if the init_flag is FALSE, and sets init_flag to TRUE after loading.
     */

    if (check_init()) return;
    try {
        const client = MongoClient.connect(uri);
        const coll = client.db(db_name).collection(article_collection);
        const samples = fs.readdirSync(load_dir);

        for (const sample of samples) {
            if (path.extname(sample) === '.json') {
                const sample_path = path.join(load_dir, sample);
                const data = JSON.parse(fs.readFileSync(sample_path));
                 const res = coll.insertOne(articleObj);
            }
        }
        client.close();
    } catch (err) {
        throw err;
    } finally {
        fs.writeFileSync(init_fp, 'TRUE');
        return;
    }
}

module.exports = { init_db }
