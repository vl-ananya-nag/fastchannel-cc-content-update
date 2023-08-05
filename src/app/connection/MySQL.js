const { createConnection, } = require('mysql');
const ENV = (process.env.ENV || 'staging');
const dataSource = require('../config/env')[`${ENV}`].db;

let dbConnection;

/**
 * generates pool connection to be used throughout the app
 */
const init = () => {
  try {
    dbConnection = createConnection({
      host: dataSource.host,
      port: dataSource.port,
      user: dataSource.username,
      password: dataSource.password,
      database: dataSource.database,
      // debug: true,
      connectTimeout: 60000,
    });
    console.debug('MySql Adapter Pool generated successfully');
  } catch (error) {
    console.error('[mysql.connector][init][Error]: ', error);
    throw new Error('failed to initialized pool');
  }
};
const close = () => {
  dbConnection.end();
}

/**
 * executes SQL queries in MySQL db
 *
 * @param {string} query - provide a valid SQL query
 * @param {string[] | Object} params - provide the parameterized values used
 * in the query
 */
const execute = (query, params) => {
  try {
    if (!dbConnection) throw new Error('Pool was not created. Ensure pool is created when running the app.');

    return new Promise((resolve, reject) => {
      dbConnection.query(query, params, (error, results) => {
        if (error) reject(error);
        else resolve(results);
      });
    });

  } catch (error) {
    console.error('[mysql.connector][execute][Error]: ', error);
    throw new Error('failed to execute MySQL query');
  }
}

module.exports = {
  init, execute, close
}