const testlogger = require('./testlogger')
const productionlogger = require('./productionlogger')
let logger = null;

if (process.env.NODE_ENV === 'testing') {
    logger = testlogger()
}

else if (process.env.NODE_ENV === 'producktion') {
    logger = productionlogger() 
}


module.exports = logger;