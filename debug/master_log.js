/**
 * Generates logs as text files in the log subfolder.
 * View subfolder for logs
 */

const fs = require('fs');
const path = require('path');
const morgan = require('morgan');

// will create the files if they do not exist
const defaultLogStream = fs.createWriteStream(path.join(__dirname, '/log/log.txt'), { flags: 'a'});
const errorFileLogStream = fs.createWriteStream(path.join(__dirname, '/log/errorlog.txt'), { flags: 'a' });

const errorLogger = {
    write: (message) => {
      if (message.includes('error')) { errorFileLogStream.write(message); }
    }
  };

const logger = morgan('combined', { stream: defaultLogStream});

function clearAllLogs() {
    // For development purposes - clears logs to make easier to find / reproduce / target specific errors
    return;
}

module.exports = logger, errorLogger;