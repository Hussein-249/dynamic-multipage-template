/**
 * This module largely serves as a controller for the direct_query module.
 */

const { 
    retrieveFeaturedDocuments,
    retrieveArticleObj,
    retrieveParagraphs,
    retrieveSearchData,
    publishArticleObj,
    retrieveSpecifiedPage,
    retrieveHeaders,
    getAllArticles 
} = require('./direct_query');

const {
    article_collection,
    live_collection,
} = require('./DBVAR');

const { dualConsoleError } = require('../debug/master_log');


// when debugging queries, try viewing the results here first
async function getFeaturedArticles() {
    let results = [];
    try {
        results = await retrieveFeaturedDocuments();
    } catch (error) {
        dualConsoleError('Error occurred during data query from handler.\n ', error);
    }
        
    return results;
}


async function getParagraphsFromArticle(articleTitle) {
    
    let paragraphs = [];
    try {

        if (!(typeof articleTitle === 'string' || articleTitle instanceof String)) {
            throw new Error('articleName parameter is not a string, cannot retrieve an article.');
        }

        articleObj = await retrieveArticleObj(articleTitle)
        paragraphs = await retrieveParagraphs(articleObj);

    } catch (error) {

        dualConsoleError(error);

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
        dualConsoleError('Error occurred during data query from handler\n ', error);
    }

    return result;

}


async function searchArticles(searchTag) {
    tagArray = []

    try {
        tagArray = await retrieveSearchData(searchTag);
    } catch (error) {
        dualConsoleError(error);
    }
        
    return tagArray;
    
}


async function publishArticle(articleObj) {
    try {
        publishArticleObj(articleObj);
    } catch (error) {
        dualConsoleError('Error publishing post:', error);
    }
    return;
}


async function getPage(pageTitle) {
    try {
        let page = retrieveSpecifiedPage(pageTitle);
        return page;

    } catch (error) {
        dualConsoleError('Error publishing post:', error);
    }
}


async function getParagraphsFromPage(pageObj) {
    
    let paragraphs = [];
    try {
        paragraphs = await retrieveParagraphs(pageObj);
    } catch (error) {
        dualConsoleError(error);
    }
    return paragraphs;
}


function getHeadersFromPage(pageObj) {
    let paragraphs = [];
    try {
        paragraphs = retrieveHeaders(pageObj);
    } catch (error) {
        dualConsoleError(error);
    }
    return paragraphs;
}


async function getAllPublishedArticles() {
    let articles = [];
    try {
        articles = getAllArticles(article_collection);
    } catch (error) {
        dualConsoleError(error);
    }
    return articles;
}


async function getAllDraftArticles() {
    let articles = [];
    try {
        articles = getAllArticles(article_collection);
    } catch (error) {
        dualConsoleError(error);
    }
    return articles;
}

module.exports = { 
    getFeaturedArticles, 
    getParagraphsFromArticle, 
    getArticle, 
    searchArticles,
    publishArticle, 
    getPage,
    getParagraphsFromPage,
    getHeadersFromPage,
    getAllPublishedArticles 
};
