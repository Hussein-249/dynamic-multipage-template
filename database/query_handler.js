const { retrieveFeaturedDocuments } = require('./direct_query');


// when debugging queries, try viewing the results here first
// the async nature means you will only be viewing Promise { <pending> } while attempting to view query results directly after closing the cursor
async function selectFeaturedArticle() {
    try {
        const result = await retrieveFeaturedDocuments();
        return result;
    } catch (error) {
        console.error('Error occurred during data query from handler: ', error);
    }
}

console.log(selectFeaturedArticle())

module.exports = { selectFeaturedArticle };