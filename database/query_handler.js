/**
 * This module serves as a wrapper for the direct_query module.
 * direct_query simply re-throws caught errors to this handler.
 * This allows the query functions to only consists of querying logic.
 * Calling and error handling is separated here.
 */


const { retrieveFeaturedDocuments, retrieveArticleObj, retrieveParagraphs, retrieveSearchData, publishArticleObj } = require('./direct_query');


// when debugging queries, try viewing the results here first
async function getFeaturedArticles() {
    try {
        results = await retrieveFeaturedDocuments();
        return results;
    } catch (error) {
        console.error('Error occurred during data query from handler.\n ', error);
    }
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


async function getArticle(articleTitle) {
    if (!(typeof articleTitle === 'string' || articleTitle instanceof String)) {
        throw new Error('articleTitle parameter is not a string, cannot retrieve an article.');
    }

    try {
        result = await retrieveArticleObj(articleTitle);
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

async function publishArticle(articleObj) {
    try {
        publishArticleObj(articleObj);
    } catch (error) {
        console.error('Error publishing post:', error);
    }
    return;
}

module.exports = { getFeaturedArticles, getParagraphsFromArticle, getArticle, searchArticles, publishArticle };
