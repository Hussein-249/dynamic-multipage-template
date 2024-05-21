/**
 * This contains a selection of functions for manually testing critical functions and modules of the code.
 * Most of the code in this application is not complex, so these function are usuful for targeting just 
 * May be integrated into unit testing and end-to-end testing.
 */

const { getRandomFeaturedArticle, getArticle, getParagraphsFromArticle } = require('../database/query_handler');


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


// printRandomFeaturedArticle();

// printSelectedArticle('Italy wins FIVB World Cup 2022');

printArticleParagraphs('Italy wins FIVB World Cup 2022');
