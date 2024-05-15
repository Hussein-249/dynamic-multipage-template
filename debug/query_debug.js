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
