/* eslint-disable no-restricted-syntax */
const mysql = require('mysql');
const mysqlConfig = require('../sql/credentials.json');
const { importCardList } = require('../files/getContents');

const connection = mysql.createConnection({
  host: mysqlConfig.write.host,
  user: mysqlConfig.write.user,
  password: mysqlConfig.write.password,
  database: mysqlConfig.write.database,
});

function addToDB(query){
  console.log(`Writing to ${connection}`);

  return 0;
}

function insert(setRootDir) {
  const query = [];
  const fileList = importCardList(setRootDir);

  console.log(fileList);

  return 0;
}

exports.insert = insert;