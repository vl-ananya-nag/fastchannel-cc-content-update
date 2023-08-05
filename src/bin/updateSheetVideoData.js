require('dotenv').config()
const MYSQLConnection = require('../app/connection/MySQL');
const { updateSheetVideoData } = require('../app/controller/updateContents');

MYSQLConnection.init();

new Promise((resolve, reject) => {
    resolve(updateSheetVideoData().then(() => { MYSQLConnection.close() }));
}).catch((err) => {
    console.log(err);
    MYSQLConnection.close()
}).finally(console.log("DONE"));
