
// implement later. Anlytics include failed connections, avg response times...

// base analytics related to site views, article views, will need to access db

// const os = require('os');
const { uptime } = require('os');

const { MongoClient } = require('mongodb');
const { uri,
        db_name,
        article_collection
        // page_collection,
        // analytics_collection
    } = require('../database/DBVAR');


function calculateTotalSiteViews() {
    return 0;
}


function mostReadArticle() {
    return;
}


function mostReadTopic() {
    return;
}


async function getSummaryStatistics() {
    /**
     * Collects statistics from the articles collection and returns them as a JSON object.
     * 
     * This function takes no parameters.
     * 
     * @returns { Object } summaryStatistics
     */

    let summaryStatistics = {
        mostReadToday: null,
        totalViewsToday: -1
    }

    const client = await MongoClient.connect(uri);

    // always async wait to prevent server close error
    const coll = client.db(db_name).collection(article_collection);
    const mostRead = await coll.find().sort({dayviewcount: -1}).limit(1);

    // cannot retrieve the value directly, must aggregate
    let totalViews = await collection.aggregate([
        {
            $group: {
                _id: null,
                dayviewcount: { $sum: "$dayviewcount" }
            }
        }
    ]).toArray();

    // 0 if no views, query problem?
    totalViews = totalViews.length > 0 ? totalViews[0].dayviewcount : 0;

    await client.close();

    summaryStatistics = {
        mostReadToday: mostRead,
        totalViewsToday: totalViews
    }
    
    return summaryStatistics;
}


function getServerUptime() {
    return String(process.uptime());
}

function getHostUptime() {
    return String(Math.floor(uptime() / 3600)) + ' Hours';
}


module.exports = {
    getServerUptime,
    getHostUptime
}