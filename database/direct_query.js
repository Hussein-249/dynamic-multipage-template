/**
 * This module directly queries the MongoDB database and directly selects data from JSON documents.
 * Although some functions only manipulate documents and do not query the database, they are included in this module
 * for simplicty as they directly interact with the objects and will be wrapped by the same query_handler module.
 */

require('dotenv').config();
const { MongoClient } = require('mongodb');

const uri = process.env.MONGODB_URI;

async function retrieveArticleObj(articleName) {
    const filter = {
        'article_name': articleName
    };

    // Replace with valid authentication credentials in env
    // if no auth is set then you can remove the userinfo section, but this is evidently a major security risk
    // no need for NewUrlParder of UnifiedTopology options 
    const client = await MongoClient.connect(uri);

    // always async wait to prevent server close error
    const coll = client.db('dynamic-news-database').collection('Articles');
    const result = await coll.findOne(filter);
    await client.close();
    return result;
};


async function retrieveFeaturedDocuments() {
    const filter = {
        'featured': 'True'
    };

    try {
        // Replace with valid authentication credentials in env
        // if no auth is set then you can remove the userinfo section, but this is evidently a major security risk
        // no need for NewUrlParder of UnifiedTopology options 
        const client = await MongoClient.connect(uri);

        const coll = client.db('dynamic-news-database').collection('Articles');
        const cursor = coll.find(filter);
        const result = await cursor.toArray();
        await client.close();
        return result;

    } catch (err) {
        throw err;
    }
};


async function retrieveParagraphs(articleObj) {
    let result = [];

    for (const key in articleObj) {
        if (key.startsWith('p')) { result.push(articleObj[key]); }
    }

    return result;
};


async function retrieveFeatureData(articleObj) {
    try { 
        return articleObj[metadata];
    } catch (err) {
        console.log(err);
    }
}


async function retrieveMostReadArticles() {
    /**
     * Retrieves the top 5 most read articles in the database (ranked dayviewcount) as a list of JSON objects.
     * Directly queries the database.
     * 
     * @param { } articleName
     * @returns { array } topArticleArray - list of JSON objects
     */
    try {
        const client = await MongoClient.connect(uri);
        const coll = client.db('dynamic-news-database').collection('Articles');
        const topArticleArray = await coll.find().sort({dayviewcount: -1}).limit(5).toArray();
        await client.close();
        return topArticleArray;

    } catch (err) {
        throw err;
    }
}


async function retrieveSearchData(searchTag) {
    const client = await MongoClient.connect(uri);
    const coll = client.db('dynamic-news-database').collection('Articles');
    await client.close();

    return;
}

module.exports = { retrieveFeaturedDocuments, retrieveArticleObj, retrieveParagraphs, retrieveMostReadArticles }
