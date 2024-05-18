/**
 * This module serves as a wrapper for the direct_query module.
 */


const { retrieveFeaturedDocuments, retrieveArticleObj, retrieveParagraphs } = require('./direct_query');


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


module.exports = { getRandomFeaturedArticle, getParagraphsFromArticle, getArticle };
