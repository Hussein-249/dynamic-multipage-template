/**
 * Generates logs as text files in the log subfolder.
 * View subfolder for logs
 */

const fs = require('fs');
const path = require('path');
const morgan = require('morgan');

// will create the file if does not exist
const errorFileLogStream = fs.createWriteStream(path.join(__dirname, '/log/errorlog.txt'), { flags: 'a' });
const errorFilePath = path.join(__dirname, '/log/errorlog.txt');


function dualConsoleError(message) {
    console.error(message);
    const errorMessage = `${new Date().toISOString()} - ${message.stack}\n`;
    fs.appendFileSync(errorFilePath, errorMessage);
}


// might not work, will revise
function selectStandardLogStream() {
	const defaultLogStream = fs.createWriteStream(path.join(__dirname, '/log/log.txt'), { flags: 'a'});
	return defaultLogStream;
}


function clearAllLogs() {
    // For development purposes - clears logs to make easier to find / reproduce / target specific errors
    return;
}


morgan.token('customErrorLog', (req, res) => {
	if (res.statusCode >= 400) {
		return `IP: ${req.ip} - Method: ${req.method} - URL: ${req.originalUrl} - Status: ${res.statusCode}`;
	} 
	// otherwise, log nothing
	return '';
})

const errorLogFormat = ':customErrorLog';
const logger = morgan('combined', { stream: selectStandardLogStream() });
const errorLogger = morgan(errorLogFormat, { stream:errorFileLogStream });

module.exports = { logger, errorLogger, dualConsoleError };
