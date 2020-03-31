require('dotenv').config();
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: process.env.DB_READ_HOST,
  user: process.env.DB_READ_USER,
  password: process.env.DB_READ_PASSWORD,
  database: process.env.DB_READ_DATABASE,
});

const readReq = (res, query) => {
  connection.query(query, (err, results) => {
    if (err) res.status(404).send(`There was an error with your request: ${err.sqlMessage}`);
    if (results == {}) res.status(204).json(results);
    res.json(results);
  });
};

exports.readReq = readReq;