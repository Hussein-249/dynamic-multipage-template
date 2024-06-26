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
    // no need for NewUrlParser or UnifiedTopology options due to deprecation
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
        // add authentication credentials in env
        // if no auth is set then you can remove the userinfo section, but this is evidently a major security risk
        // no need for NewUrlParser of UnifiedTopology options 
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
     * Retrieves the top 5 most read (published) articles in the database (ranked dayviewcount) as a list of JSON objects.
     * Directly queries the database.
     * 
     * @param { } articleName
     * @returns { array } topArticleArray - list of JSON objects
     */

    let topArticleArray = [];
    try {
        const client = await MongoClient.connect(uri);
        const coll = client.db('dynamic-news-database').collection('Articles');
        const topArticleArray = await coll.find().sort({dayviewcount: -1}).limit(5).toArray();
        await client.close();
    } catch (err) {
        throw err;
    } finally { 
        return topArticleArray;
    }
}


async function retrieveSearchData(searchTag) {
     /**
     * Retrieves all published articles in the database (ranked dayviewcount) as a list of JSON objects.
     * Directly queries the database.
     * 
     * @param { } searchTag - string input from search form
     * @returns { array } tagArray - list of JSON objects (published articles)
     */

    let tagArray = [];

    try { 
        const client = await MongoClient.connect(uri);

        const coll = client.db('dynamic-news-database').collection('Articles');

        // find articles whose tag key contains the specified search tag
        tagArray = await coll.find({ tags: { $in: [searchTag] } }).toArray();

        // uncommenting will help debug
        // console.log(`Retrieved ${tagArray.length} articles for search tag: ${searchTag}`);

        await client.close();
    } catch(error) {
        // throw to query_handler
        throw error;
    } finally {
        return tagArray;
    }
}

async function publishArticleObj(articleObj) {

    const client = await MongoClient.connect(uri);
    const coll = client.db('dynamic-news-database').collection('Articles');
    // adding JSON object (article) to the Articles collection
    const res = await coll.insertOne(articleObj);
    console.log('JSON object (article) inserted.');

    await client.close();
    return;
}

module.exports = { 
    retrieveFeaturedDocuments,
    retrieveArticleObj,
    retrieveParagraphs,
    retrieveMostReadArticles,
    retrieveSearchData,
    publishArticleObj
}
