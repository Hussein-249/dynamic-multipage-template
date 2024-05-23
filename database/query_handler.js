/**
 * This module serves as a wrapper for the direct_query module.
 * direct_query simply re-throws caught errors to this handler.
 * This allows the query functions to only consists of querying logic.
 * Calling and error handling is separated here.
 */


const { retrieveFeaturedDocuments, retrieveArticleObj, retrieveParagraphs, retrieveSearchData } = require('./direct_query');
// const errorLogger = require('../debug/master_log');

// when debugging queries, try viewing the results here first
async function getRandomFeaturedArticle() {
    let results = [];
    try {
        results = await retrieveFeaturedDocuments();
    } catch (error) {
        console.error('Error occurred during data query from handler.\n ', error);
    }

    const numFeatured = results.length;

    let selection = Math.floor(Math.random() * numFeatured);

    const selected = results[selection];

    return selected;
}


async function getParagraphsFromArticle(articleName) {
    if (!(typeof articleName === 'string' || articleName instanceof String)) {
        throw new Error('articleName parameter is not a string, cannot retrieve an article.');
    }

    let paragraphs = [];
    try {
        articleObj = await retrieveArticleObj(articleName)
        paragraphs = await retrieveParagraphs(articleObj);
    } catch (error) {
        console.error('Error occurred during data query from handler\n ', error);
    }

    return paragraphs;
}


async function getArticle(articleName) {
    if (!(typeof articleName === 'string' || articleName instanceof String)) {
        throw new Error('articleName parameter is not a string, cannot retrieve an article.');
    }

    try {
        result = await retrieveArticleObj(articleName);
    } catch (error) {
        console.error('Error occurred during data query from handler\n ', error);
    }

    return result;
}

async function searchArticles(searchTag) {
    tagArray = []

    try {
        tagArray = await retrieveSearchData(searchTag);
    } catch (error) {
        console.log(error)
    } finally {
        return tagArray;
    }
}

module.exports = { getRandomFeaturedArticle, getParagraphsFromArticle, getArticle, searchArticles };
