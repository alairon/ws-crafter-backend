const mysql = require('mysql');
const { openConnection } = require('./dbOperations');
const mysqlConfig = require('../sql/credentials.json');

const connection = mysql.createConnection({
  host: mysqlConfig.read.host,
  user: mysqlConfig.read.user,
  password: mysqlConfig.read.password,
  database: mysqlConfig.read.database,
});

function readTest(request) {
  openConnection(connection);
  connection.query(request);
}

exports.readTest = readTest;
