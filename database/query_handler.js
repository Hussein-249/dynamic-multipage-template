const { retrieveFeaturedDocuments, retrieveArticleObj, retrieveParagraphs } = require('./direct_query');


// when debugging queries, try viewing the results here first
async function selectFeaturedArticle() {
    let result = null;
    try {
        result = await retrieveFeaturedDocuments();
    } catch (error) {
        console.error('Error occurred during data query from handler: ', error);
    }

    return result;
}


async function getParagraphsFromArticle(articleName) {
    if (!(typeof articleName === 'string' || articleName instanceof String)) {
        throw new Error('articleName parameter is not a string, cannot retrieve an article.');
    }

    let paragraphs = [];
    try {
        paragraphs = await retrieveParagraphs(articleName);
    } catch (error) {
        console.error('Error occurred during data query from handler: ', error);
    }

    return paragraphs;
}

// console.log(selectFeaturedArticle())

console.log(retrieveArticleObj('Article Title'))

module.exports = { selectFeaturedArticle, getParagraphsFromArticle };
