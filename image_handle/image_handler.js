const fs = require('node:fs');
const uniqueGen = require('./unique_key_gen')

function findArticleImage(articleName, dirName) {

    const ukey = uniqueGen.nameToUniqueKey(articleName);

    return 0;
}


function storeImage(articleName, pathToImages) {
    const uniqueKey = uniqueGen.nameToUniqueKey(articleName);
    const newDirName = uniqueKey.hashString;
    const imgName = uniqueKey.articleName;
    uniquePath = path.join(pathToImages, newDirName);

    try {
        if (!fs.existsSync(uniquePath)) {
            fs.mkdir(uniquePath)
        }

        const imagesInDir = fs.readdirSync(uniquePath);
        const existingNames = imagesInDir.filter(image => image.startsWith(imgName));

    } catch (err) { 
        console.error(err);
    }

    return;
}


function setImageName(articleName, pathToImages) {
    imageName = uniqueGen.nameToUniqueKey(articleName);

    // global replacement (immutable, therefore store in new variable)
    sanitizedName = imageName.articleName.replace(/ /g, '');
    
    return imageName.hashString + '_' + sanitizedName;
}

// res = setImageName("First Article With Image")

// console.log(res)

module.exports = { findArticleImage, storeImage, setImageName };
