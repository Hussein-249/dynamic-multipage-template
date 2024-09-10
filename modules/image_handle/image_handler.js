const fs = require('fs');
const path = require('path');
const uniqueGen = require('./unique_key_gen');


function isImage(file) {
     const extensions = ['.png', '.jpg', '.jpeg'];
     const extension = path.extname(file).toLowerCase();
     return extensions.includes(extension);
}


function findArticleImage(articleTitle) {
    /**
     * Returns the path to an image associated with an article.
     * 
     * @param { string } articleTitle - the name of the article associated with the image
     * @returns { string } the path to the image
     */

    const ukey = uniqueGen.nameToUniqueKey(articleTitle);

    try {
        var searchDir = path.join(__dirname, '../../public/img', ukey);
        var files = fs.readdirSync(searchDir);
        var image = files.find(file => file.toLowerCase().startsWith(articleTitle.toLowerCase()));

        if (image && isImage(image)) {
            return path.join('/img', ukey, image);
        } 
    } catch(err) {
        console.error('Unable to locate directory for the image associated with this article!');
        throw(err);
    }
}

module.exports = { findArticleImage };
