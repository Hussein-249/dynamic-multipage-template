/**
 * This contains a selection of functions for manually testing critical functions and modules of the code.
 * Most of the code in this application is not complex, so these function are usuful for targeting a specific section of code.
 * However, the tests included under tests should cover the major aspects.
 * May be integrated into unit testing and end-to-end testing.
 */

const { getRandomFeaturedArticle, getArticle, getParagraphsFromArticle, searchArticles } = require('../database/query_handler');


async function printRandomFeaturedArticle() {
    try {
        const article = await getRandomFeaturedArticle();
        console.log(article);
    } catch (error) {
        console.error(error);
    }
}


async function printSelectedArticle(articleName) {
    try {
        const article = await getArticle(articleName);
        console.log(article);
    } catch (error) {
        console.error(error);
    }
}


async function printArticleParagraphs(articleName) {
    try {
        const article = await getParagraphsFromArticle(articleName);
        console.log(article);
    } catch (error) {
        console.error(error);
    }
}


async function printArticlesContainingTag(tag) {
    try {
        const articles = await searchArticles(tag);
        console.log(articles);
    } catch (error) {
        // may be redundant since errors caught in the handler
        console.error(error);
    }
}
