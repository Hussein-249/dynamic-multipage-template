/*
 * Description: A basic Express server to serve EJS template with content dynamically added from a MongoDB database.
 * Server listens on port 3000 unless specified in environment variables.
 * 
*/

// prevents silent errors
"use strict";

// node modules  
const express = require('express');
const helmet = require('helmet');
const path = require('path');
const rlimit = require('express-rate-limit');

const productionMode = process.env.NODE_ENV === 'production'

// imports or modules from project-code
const imageHandler = require('./src/modules/image_handle/image_handler');
const { logger, errorLogger, dualConsoleError } = require('./src/debug/master_log');
const { init_db } = require('./src/modules/database/init');
const { getFeaturedArticles } = require('./src/modules/database/query_handler');

// importing routes
const adminRoute = require('./src/routes/admin');
const aboutRoutes = require('./src/routes/about');
const articleRoute = require('./src/routes/article');
const liveRoute = require('./src/routes/live');
const searchRoute = require('./src/routes/search');

const PORT = process.env.PORT || 3000;
init_db(); // set up database if it does not exists / has not been configured
const app = express();

// Might need to disable this for load testing
// minute limit * seconds to min conversion * ms to s conversion
const rateLimit = rlimit({
    windowMs: 15 * 60 * 1000,
    max: 125,
    message: 'Excessive number of requests from this IP. Please try again in a few minutes.'
});

app.set('view engine', 'ejs'); // using the express ejs view engine

app.set('views', path.join(__dirname, './src/views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use('/css', express.static(path.join(__dirname, 'src/css')));
app.use('/js', express.static(path.join(__dirname, 'src/js')));


app.use(helmet());

// Might need to disable this for load testing
app.use(rateLimit);
app.use(logger);
app.use(errorLogger);

// use routes
app.use('/admin', adminRoute);
app.use('/about', aboutRoutes);
app.use('/article', articleRoute);
app.use('/live', liveRoute);
app.use('/search', searchRoute);

// The bootstrap and fortawesome code below can be removed if your solution uses a CDN to deliver the necessary files.

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
    res.setHeader('Content-Type', 'text/css'); // manually ensuring that fontawesome is recognized properly by setting MIME type
    res.sendFile(faPath);
});

app.get(['/', '/home', '/article'], async (req, res) => {
    const homepageArticles = await getFeaturedArticles();
    const firstArticle = homepageArticles[0];
    const secondArticle = homepageArticles[1];

    res.render('index', { firstArticle, secondArticle, url: require('url') });
});

// include error routes AFTER all other routes.
// This ensures that it only handles errors that are not matched.

app.use((req, res, next) => {
    res.status(404).render('error', {
      errorCode: 404,
      errorMessage: 'Page not found.'
    });
  });


app.use((err, req, res, next) => {
    console.error(err.stack);
    
    if (err.statusCode) {
        errorCode = err.statusCode;
        errorMessage = err.message;
    }

    let errorCode = 500;
    let errorMessage = 'Internal Server Error';

    res.status(errorCode).render('error', {
        errorCode: errorCode,
        errorMessage: errorMessage
    });
});


app.listen(PORT, error => { 
    if (error) { console.log(error); }
    else {
        console.log('\x1b[32m', 'Server has been started.', '\x1b[0m', 'Listening on port:', PORT);
        console.log('\x1b[0m', 'Ctrl + C to terminate server.');
        console.log('\x1b[0m', 'Homepage:', '\x1b[35m', `http://localhost:${PORT}/`, '\x1b[0m');
        console.log('\x1b[0m', 'Admin link:', '\x1b[35m', `http://localhost:${PORT}/admin`, '\x1b[0m');
        console.log('\x1b[0m', 'Live link:', '\x1b[35m', `http://localhost:${PORT}/live`, '\x1b[0m');
        console.log('\x1b[0m', 'Page link:', '\x1b[35m', `http://localhost:${PORT}/about`, '\x1b[0m');
        console.log('\x1b[0m', 'Sample search result:', '\x1b[35m', `http://localhost:${PORT}/search/Poland`, '\x1b[0m');
        console.log('\x1b[0m', 'Sample article link:', '\x1b[35m', `http://localhost:${PORT}/article/Italy-wins-FIVB-World-Cup-2022`, '\x1b[0m');
        console.log('\x1b[0m', 'Alternate article link:', '\x1b[35m', `http://localhost:${PORT}/article/This-year\'s-WEF-meeting-draws-to-a-close`, '\x1b[0m');
    }
});
