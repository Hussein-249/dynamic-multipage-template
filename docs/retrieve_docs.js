const path = require('path');
const fs = require('fs');

function retreive_docs_as_JSON() {
    const docpath = path.join(__dirname, '../docs/documentation.json');

    const docContents = fs.readFileSync(docpath, 'utf-8');

    const jsonData = JSON.parse(docContents);

    return jsonData;
}

module.exports = { retreive_docs_as_JSON };
