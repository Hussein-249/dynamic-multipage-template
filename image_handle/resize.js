/**
 * This module resizes images.
 * This is needed for 
 *  - consistency in layout
 *  - efficiency
 */

const sharp = require('sharp');

function resizeImage(imagePath) {
    const imgToList = imagePath.split('.');
    const resized = imagePath[0] + '-1024' + imagePath[-1];

    try { 
        sharp(imagePath)
        .resizeImage(1024, 1024)
        .tofile();

    } catch (err) {
        console.log(err);
    }

    return;
}

module.exports = { resizeImage };
