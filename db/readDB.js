const mysql = require('mysql');
const { openConnection } = require('./dbOperations');
const mysqlConfig = require('../config/sql/credentials.json');

const connection = mysql.createConnection({
  host: mysqlConfig.read.host,
  user: mysqlConfig.read.user,
  password: mysqlConfig.read.password,
  database: mysqlConfig.read.database,
});

function callback(err, results) {
  if (err) throw err;
  return (results);
}

function readTest(request) {
  openConnection(connection);
  return connection.query(request, callback);
}

exports.readTest = readTest;
