/**
 * Generates logs as text files in the log subfolder.
 * View subfolder for logs
 */

const fs = require('fs');
const path = require('path');
const morgan = require('morgan');

const defaultLogStream = fs.createWriteStream(path.join(__dirname, '/log/log.txt'), { flags: 'a'});

const logger = morgan('combined', { stream: defaultLogStream});

function clearAllLogs() {
    // For development purposes - clears logs to make easier to find / reproduce / target specific errors
    return;
}

module.exports = logger;