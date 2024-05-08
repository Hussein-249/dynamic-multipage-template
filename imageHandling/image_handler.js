const fs = require('node:fs');
const uniqueGen = require('./unique_key_gen')

function findArticleImage(articleName, dirName) {

    return 0;
}


function storeImage(articleName, pathToImages) {
    uniqueKey = uniqueGen.nameToUniqueKey(articleName);
    newDirName = uniqueKey.hashString;
    imgName = uniqueKey.articleName;
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