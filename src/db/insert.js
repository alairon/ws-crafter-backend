/* eslint-disable no-restricted-syntax */


const mysql = require('mysql');
const mysqlConfig = require('../sql/credentials.json');

const connection = mysql.createConnection({
  host: mysqlConfig.write.host,
  user: mysqlConfig.write.user,
  password: mysqlConfig.write.password,
  database: mysqlConfig.write.database,
});

function insert(set) {
  const query = [];
  for (const element of Object.keys(set)) {
    for (const inner of Object.values(set)) {
      console.log (`${element}\n${Object.keys(inner)}\n${Object.values(inner)}\n`);
    }
  }

  for (const element of query) {
    connection.query(element, (err, result) => {
      if (err) console.log(err);
      console.log(result);
    });
  }
}

exports.connection = connection;
