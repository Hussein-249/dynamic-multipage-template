require('dotenv').config();
const { MongoClient } = require('mongodb');


async function retrieveArticleObj(articleName) {
    const uri = process.env.MONGODB_URI;
    const filter = {
        'article_name': articleName
    };

    // Replace with valid authentication credentials in env
    // if no auth is set then you can remove the userinfo section, but this is evidently a major security risk
    // no need for NewUrlParder of UnifiedTopology options 
    const client = await MongoClient.connect(uri);

    // always async wait to prevent server close error
    const coll = client.db('dynamic-news-database').collection('Articles');
    const result = await coll.findOne(filter);
    await client.close();
    return result;
};


async function retrieveFeaturedDocuments() {
    const uri = process.env.MONGODB_URI;
    const filter = {
        'featured': 'True'
    };

    // Replace with valid authentication credentials in env
    // if no auth is set then you can remove the userinfo section, but this is evidently a major security risk
    // no need for NewUrlParder of UnifiedTopology options 
    const client = await MongoClient.connect(uri);

    const coll = client.db('dynamic-news-database').collection('Articles');
    const cursor = coll.find(filter);
    const result = await cursor.toArray();
    await client.close();
    return result;
};


async function retrieveParagraphs(articleObj) {
    let result = [];

    for (const key in articleObj) {
        if (key.startsWith('p')) {
            result.push(articleObj[key]);
        }
    }

    return result;
};

async function retrieveFeatureData(articleObj) {
    return;
}

module.exports = { retrieveFeaturedDocuments, retrieveArticleObj, retrieveParagraphs }
