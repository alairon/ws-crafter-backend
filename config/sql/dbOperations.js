const mysql = require('mysql');
const mysqlConfig = require('./credentials.json');

const connection = mysql.createConnection({
  host: mysqlConfig.read.host,
  user: mysqlConfig.read.user,
  password: mysqlConfig.read.password,
  database: mysqlConfig.read.database,
});

const openConnection = connection.connect((err) => {
  if (err) {
    console.error(err.errno);
    return (err.errno);
  }
  return (0);
});

const closeConnection = connection.end((err) => {
  if (err) return (err.errno);
  return (0);
});

exports.openConnection = openConnection;
exports.closeConnection = closeConnection;
