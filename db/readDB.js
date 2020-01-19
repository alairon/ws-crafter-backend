const mysql = require('mysql');
const { openConnection, closeConnection } = require('./dbOperations');
const mysqlConfig = require('../config/sql/credentials.json');

const connection = mysql.createConnection({
  host: mysqlConfig.read.host,
  user: mysqlConfig.read.user,
  password: mysqlConfig.read.password,
  database: mysqlConfig.read.database,
});

function test() {
  openConnection(connection);
  connection.query('SELECT * from test', (error, rows, fields) => {
    if (error) console.error (error.sqlMessage);
    console.log(rows);
    return (rows);
  });

  closeConnection(connection);
}

exports.test = test;