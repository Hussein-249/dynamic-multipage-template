const crypto = require('crypto');


function hashImageName(articleName) {
    const hash = crypto.createHash('sha512');
    hash.update(articleName);
    return hash.digest('hex');
}

function nameToUniqueKey(articleName) {
    hashString = hashImageName(articleName);
    // return hashString + '_' + articleName;
    return { hashString, articleName };
}
