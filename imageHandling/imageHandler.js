const fs = require('node:fs');
const uniqueGen = require('./uniqueKeyGenerator')

function findArticleImage(articleName, dirName) {

    return 0;
}


function storeImage(articleName, pathToImages) {
    uniqueKey = uniqueGen.nameToUniqueKey(articleName);
    temp = uniqueKey[0];
    imgName = uniqueKey[1];
    uniquePath = path.join(pathToImages, temp);

    try {
        if (!fs.existsSync(uniquePath)) {
            fs.mkdir(uniquePath)
        }
        

    } catch (err) { 
        console.error(err);
    }

    return;
}