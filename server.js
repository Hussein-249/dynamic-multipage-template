/*
Very basic Express server.

Server listens on port 3001 unless specified in environment variables.
*/
const http = require('http');
const express = require('express');

// import mime from 'mime'; // to correctly set MIME types
const path = require('path');
const redis = require('redis'); // for a shared cache when re-using content, implement later

const PORT = process.env.PORT || 3001;

const app = express();

const redisClient = redis.createClient();

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

// there may be a source map warning associated with this
app.get('/node_modules/bootstrap/dist/css/bootstrap.min.css', (req, res) => {
    const bootstrapPath = path.join(__dirname, '/node_modules/bootstrap/dist/css/bootstrap.min.css');
    res.setHeader('Content-Type', 'text/css'); // manually ensuring that bootstrap.min.css is recognized properly
    res.sendFile(bootstrapPath);
});

app.get('/', (req, res) => {
    const showDiv = true; // for toggling divs in templates
    const myvar = "Dynamic Var";
    res.render('index', { showDiv, myvar });

});

app.listen(PORT, error => { 
    if (error) { console.log(error); }
    else {
        console.log(`Server has been started. Listening on port: ${PORT}`);
        console.log(`Ctrl + C to terminate server.`);
        console.log(`Viewable at: http://localhost:3001/'`); // include later
    }
});
