    const { MongoClient } = require('mongodb');


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

    module.exports = { retrieveFeaturedDocuments }
