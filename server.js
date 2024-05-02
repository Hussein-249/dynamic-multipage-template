/*
Very basic express server.

Server listens on port 3001 unless specified in environment variables.
*/
var http = require('http');
var express = require('express');
var path = require('path');

const PORT = process.env.PORT || 3001;

var app = express();

app.listen(PORT, error => { 
    if (error) { console.log(error); }
    else {
        console.log(`Server has been started. Listening on port: ${PORT}`);
        console.log(`Ctrl + C to terminate batch job.`);
        console.log(`Viewable at:`); // include later
    }
});
