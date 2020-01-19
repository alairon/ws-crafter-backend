const mysql = require('mysql');
const mysqlConfig = require('../config/sql/credentials.json');

const connection = mysql.createConnection({
  host: mysqlConfig.write.host,
  user: mysqlConfig.write.user,
  password: mysqlConfig.write.password,
  database: mysqlConfig.write.database,
});


exports.connection = connection;