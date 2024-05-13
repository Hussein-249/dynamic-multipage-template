    const { MongoClient } = require('mongodb');


    async function retrieveArticleObj(articleName) {
        const filter = {
            'article_name': articleName
        };

        // Replace 'admin' with valid authentication credentials
        // if no auth is setup then you can remove the userinfo section, but this is a major security risk and no databse should ever be unprotected
        const client = await MongoClient.connect('mongodb://admin:admin@localhost:27017/');

        // always async wait to prevent server close error
        const coll = client.db('dynamic-news-database').collection('Articles');
        const result = await coll.findOne(filter);
        await client.close();
        console.log(result);
        return result;
    };


    async function retrieveFeaturedDocuments() {
        const filter = {
            'featured': 'True'
        };

        // Replace 'admin' with valid authentication credentials
        // if no auth is setup then you can remove the userinfo section, but this is a major security risk and no databse should ever be unprotected
        const client = await MongoClient.connect('mongodb://admin:admin@localhost:27017/');

        const coll = client.db('dynamic-news-database').collection('Articles');
        const cursor = coll.find(filter);
        const result = await cursor.toArray();
        await client.close();
        console.log(result);
        return result;
    };


    async function retrieveParagraphs(articleObj) {
        const result = [];

        for (const key in articleObj) {
            if (key.startsWith('p')) {
                result.push (articleObj[key])
            }
        }

        return result;
    };

    async function retrieveFeatureData(articleObj) {
        return;
    }

    module.exports = { retrieveFeaturedDocuments, retrieveArticleObj }
