/**
 * This module directly queries the MongoDB database and directly selects data from JSON documents.
 * Although some functions present in this file only manipulate documents and do not query the database, 
 * they are still included in this module for simplicity.
 * This is because they interact with objects and will be wrapped by the same query_handler module as the functions that query the database.
 */

require('dotenv').config();
const { MongoClient } = require('mongodb');
const { uri,
        db_name,
        article_collection,
        live_collection,
        page_collection,
        analytics_collection
    } = require('./DBVAR');
const { dualConsoleError } = require('../../debug/master_log');


async function retrieveArticleObj(articleTitle) {
    /**
     * Retrieves a JSON article from the database matching the specified articleTitle.
     * 
     * @param { string } articleTitle - the title of the target article, matching the article_title field in the JSON / BSON document.
     * @returns { Object } tresult - a JSON object from the databse whose 'article_title' field matches the specified articleTitle parameter.
     */

    const filter = {
        'article_title': articleTitle
    };

    // Replace with valid authentication credentials in env
    // if no auth is set then you can remove the userinfo section, but this is evidently a major security risk
    // no need for NewUrlParser or UnifiedTopology options due to deprecation
    // this applies to await MongoClient.connect() in all other functions.
    const client = await MongoClient.connect(uri);

    // always async wait to prevent server close error
    const coll = client.db(db_name).collection(article_collection);
    const result = await coll.findOne(filter);
    await client.close();
    return result;
};


async function retrieveFeaturedDocuments() {
    const filter = {
        'metadata.featured': 'True'
    };

    try {
        // add authentication credentials in env
        // if no auth is set then you can remove the userinfo section, but this is evidently a major security risk
        // no need for NewUrlParser of UnifiedTopology options 
        const client = await MongoClient.connect(uri);

        const coll = client.db(db_name).collection(article_collection);
        const cursor = coll.find(filter).sort({ 'metadata.date_published' : -1}).limit(2); // select two most recently published articles with 'featured'
        const result = await cursor.toArray();
        await client.close();
        return result;

    } catch (err) {
        throw err;
    }
};


function retrieveParagraphs(articleObj) {
    let result = [];

    for (const key in articleObj) {
        if (key.startsWith('p')) { result.push(articleObj[key]); }
    }

    return result;
};


function retrieveHeaders(articleObj) {
    let result = [];

    for (const key in articleObj) {
        if (key.startsWith('h')) { result.push(articleObj[key]); }
    }

    return result;
};


async function retrieveMostReadArticles() {
    /**
     * Retrieves the top 5 most read (published) articles in the database (ranked dayviewcount) as a list of JSON objects.
     * Directly queries the database.
     * 
     * This function takes no parameters.
     * 
     * @returns { array } topArticleArray - list of JSON objects
     */

    let topArticleArray = [];
    try {
        const client = await MongoClient.connect(uri);
        const coll = client.db(db_name).collection(article_collection);
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
     * 
     * @param { } searchTag - string input from search form
     * @returns { array } tagArray - list of JSON objects (published articles)
     */

    let tagArray = [];

    try { 
        const client = await MongoClient.connect(uri);

        const coll = client.db('dynamic-news-database').collection('Articles');

        // find articles whose tag key contains the specified search tag
        tagArray = await coll.find({ 'metadata.tags': { $in: [searchTag] } }).toArray();

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
    /**
     * Pushes an article object to the articles collection in MongoDB.
     * 
     * @param { } articleObj - JSON object representing the article and its metadata
     * @returns { }
     */

    const client = await MongoClient.connect(uri);
    const coll = client.db(db_name).collection(article_collection);
    // adding JSON object (article) to the Articles collection
    const res = await coll.insertOne(articleObj);
    console.log('JSON object (article) inserted.');

    await client.close();
    return;
}


async function retrieveLiveObjects() {
    /**
     * Retrieves all objects currently within the live collection.
     * 
     * @returns { }
     */

    let result = [];
    const client = await MongoClient.connect(uri);
    const coll = client.db(db_name).collection(live_collection);

    await client.close();
    return result;
}


async function resetLiveObjects() {
    /**
     * Deletes all objects currently within the live collection.
     * 
     * @returns { }
     */

    const client = await MongoClient.connect(uri);
    const coll = client.db(db_name).collection(live_collection);

    await client.close();
    return;
}


async function incrementDataBaseError(errorNumber) {
    const client = await MongoClient.connect(uri);
    const coll = client.db(db_name).collection(analytics_collection);
    await client.close();
    return;
}


// The functions after this point deal with the 'organizational' pages, such as the about and privacy policy pages.
// We refer to the objects targeted here as pages rather than articles to distinguish between the two.


async function retrieveSpecifiedPage(pageTitle) {
    /**
     * Retrieves a JSON article from the database matching the specified pageTitle.
     * 
     * @param { string } pageTitle - the title of the target page
     * @returns { Promise<Object> } matchingPage - a JSON object that that matches the specified pageTitle to the 'title' field in the JSON / BSON document.
     */

    const filter = {
        'title': pageTitle
    };

    try {
        const client = await MongoClient.connect(uri);
        const coll = client.db(db_name).collection(page_collection);
        const matchingPage = await coll.findOne(filter);
        await client.close();
        return matchingPage;

    } catch (err) {
        throw err;
    }
}


async function getAllArticles(collection) {
    /**
     * Returns a list of all published articles, sorted by date published.
     * 
     * @param { } 
     * @returns { Promise<Array> } 
     */

    try {
        const client = await MongoClient.connect(uri);
        const coll = client.db(db_name).collection(collection);
        const posts = await coll.find().toArray();
        await client.close();
        return posts;

    } catch (err) {
        dualConsoleError("Error occurred during attempt to fetch all posts.");
        throw err;
    }
}


module.exports = { 
    retrieveFeaturedDocuments,
    retrieveArticleObj,
    retrieveParagraphs,
    retrieveMostReadArticles,
    retrieveSearchData,
    publishArticleObj,
    retrieveSpecifiedPage,
    retrieveHeaders,
    getAllArticles
}
