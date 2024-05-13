const { retrieveFeaturedDocuments, retrieveArticleObj } = require('./direct_query');


// when debugging queries, try viewing the results here first
// the async nature means you will only be viewing Promise { <pending> } while attempting to view query results directly after closing the cursor
async function selectFeaturedArticle() {
    var result =  null;
    try {
        result = await retrieveFeaturedDocuments();
        return result;
    } catch (error) {
        console.error('Error occurred during data query from handler: ', error);
    }

    return null;
}

// console.log(selectFeaturedArticle())

console.log(retrieveArticleObj('Article Title'))

module.exports = { selectFeaturedArticle };
