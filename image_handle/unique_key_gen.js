const { createHash } = require('blake2');


function hashImageName(articleName) {
    /** 
     * Takes a string returns the blake2b hash 
     * */

    // Blake2b was selected as the hash method as it is faster than sha256.
    // Moreover, this use case aims to generate unique strings, and not to hide information, so if sha is stronger it is irrelevant

    // blake does not accept a raw string as an argument, but rather a buffer object.
    // We need to create a buffer object from the input string.
    const buffer = Buffer.from(articleName);

    const hash = createHash('blake2b', { digestLength: 32 });
    hash.update(buffer);
    return hash.digest('hex');
}


function nameToUniqueKey(articleName) {
    hashString = hashImageName(articleName);

    if (typeof(hashString) !== 'string') {
        throw new Error('Hash did not successfully return a string.');
    }
    
    return { hashString, articleName };
}


// export for use in imageHandler.js
module.exports = { nameToUniqueKey };
