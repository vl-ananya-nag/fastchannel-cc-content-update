require('dotenv').config()
const MYSQLConnection = require('../app/connection/MySQL');
const { collectFastChannelDataRDS } = require('../app/controller/fcData')

MYSQLConnection.init();

new Promise((resolve, reject) => {
    return resolve(collectFastChannelDataRDS());
}).catch((err) => {
    console.log(err);
}).finally(MYSQLConnection.close());
