/*
Very basic express server.

Server listens on port 3001 unless specified in environment variables.
*/
var http = require('http');
var express = require('express');
var path = require('path');

const PORT = process.env.PORT || 3001;

var app = express();

app.set('view engine', 'ejs'); // using the express ejs view engine

app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
    const showDiv = true; // for toggling divs in templates
    const myvar = "Dynamic Var";
    res.render('index', { showDiv, myvar });

});

app.listen(PORT, error => { 
    if (error) { console.log(error); }
    else {
        console.log(`Server has been started. Listening on port: ${PORT}`);
        console.log(`Ctrl + C to terminate batch job.`);
        console.log(`Viewable at: http://localhost:3001/'`); // include later
    }
});
