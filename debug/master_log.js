const fs = require('fs');
const path = require('path');
const morgan = require('morgan');

const defaultLogStream = fs.createWriteStream(path.join(__dirname, '/log/log.txt'), { flags: 'a'});

const logger = morgan('combined', { stream: defaultLogStream});

module.exports = logger;