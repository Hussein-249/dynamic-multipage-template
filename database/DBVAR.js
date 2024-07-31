require('dotenv').config();


const uri = process.env.MONGODB_URI;
const db_name = process.env.MONGODB_DB_NAME;
const article_collection = process.env.ARTICLE_COLL;
const live_collection = process.env.LIVE_COLL;
const analytics_collection = process.env.ANALYTICS_COLL;
const page_collection = process.env.PAGE_COLL;


module.exports = {
    uri,
    db_name,
    article_collection,
    live_collection,
    analytics_collection,
    page_collection
}
