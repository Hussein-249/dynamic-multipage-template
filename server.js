/*
 * Original Author (OA): Hussein-249
 * 
 * Description: A very basic Express server.
 * Server listens on port 3000 unless specified in environment variables.
 * 
 * EXECUTION:
 * npm start
 * 
 * OR
 * 
 * node server.js
 * 
*/

// requirements in alphabetical order
const express = require('express');
const { MongoClient } = require('mongodb');
const http = require('http');
const path = require('path');
const redis = require('redis'); // for a shared cache when re-using content, implement later


// imports from project-code
const imageHandler = require('./imageHandling/image_handler')
// const routes = require('./routes/routes')
const uniqueGen = require('./imageHandling/unique_key_gen')


const PORT = process.env.PORT || 3000;

const app = express();

const adminRoute = require('./routes/admin');
const articleRoute = require('./routes/article');
const liveRoute = require('./routes/live');

const redisClient = redis.createClient();

// const mongoURI = "mongodb://admin:admin@localhost:27017/";

// const databaseClient = new MongoClient(mongoURI);

app.set('view engine', 'ejs'); // using the express ejs view engine

app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// for custom error pages
app.use((err, req, res, next) => {
    console.error(err.stack);
    const errorCode = 500;
    let errorMessage = 'Internal Server Error';

    if (err.statusCode) {
        errorCode = err.statusCode;
        errorMessage = err.message;
    }

    res.status(errorCode).render('error', {
        errorCode: errorCode
    });
});

app.use('/admin', adminRoute);
app.use('/article', articleRoute)
app.use('/live', liveRoute);


// The bootstrap and fortawesome code below can be removed if your solution uses a CDN to deliver the necessary files.
// However, installing the necessary packes in the local directory is better for customization.

// May not be the optimal solution to MIME type mismatch
// there may be a source map warning associated with this
app.get('/node_modules/bootstrap/dist/css/bootstrap.min.css', (req, res) => {
    const bootstrapPath = path.join(__dirname, '/node_modules/bootstrap/dist/css/bootstrap.min.css');
    res.setHeader('Content-Type', 'text/css'); // manually ensuring that bootstrap.min.css is recognized properly
    res.sendFile(bootstrapPath);
});

// May not be the optimal solution to MIME type mismatch
// Also redundant if using a CDN
app.get('/node_modules/@fortawesome/fontawesome-free/css/all.min.css', (req, res) => {
    const faPath = path.join(__dirname, '/node_modules/@fortawesome/fontawesome-free/css/all.min.css');
    res.setHeader('Content-Type', 'text/css'); // manually ensuring that fontawesome is recognized properly
    res.sendFile(faPath);
});

app.get('/', (req, res) => {
    // MongoClient.connect();
    const showDiv = true; // for toggling divs in templates
    const myvar = "Dynamic Var";
    const articleImageID = 

    // will need to make a series of database requests
    res.render('index', { showDiv, myvar });

});

app.listen(PORT, error => { 
    if (error) { console.log(error); }
    else {
        console.log(`Server has been started. Listening on port: ${PORT}`);
        console.log(`Ctrl + C to terminate server.`);
        console.log(`Viewable at: http://localhost:3000/'`);
        console.log(`Admin Link: http://localhost:3000/admin'`);
        console.log(`Live Update at: http://localhost:3000/live'`);
        console.log(`Sample article at: http://localhost:3000/article'`);
    }
});
