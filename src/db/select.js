const mysql = require('mysql');
const mysqlConfig = require('../..//sql/credentials.json');

const connection = mysql.createConnection({
  host: mysqlConfig.read.host,
  user: mysqlConfig.read.user,
  password: mysqlConfig.read.password,
  database: mysqlConfig.read.database,
});

const readReq = (res, query) => {
  connection.query(query, (err, results) => {
    if (err) res.status(404).send(`There was an error with your request: ${err.sqlMessage}`);
    if (results == {}) res.status(204).json(results);
    res.json(results);
  });
};

exports.readReq = readReq;