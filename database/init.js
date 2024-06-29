require('dotenv').config();

const init = process.env.INIT_FLAG;

function init_db() {
    if (init) {

    }
}

module.exports = { init_db }
