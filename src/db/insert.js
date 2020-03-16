/* eslint-disable no-restricted-syntax */
const mysql = require('mysql');
const mysqlConfig = require('../../sql/credentials.json');
const { readFile } = require('fs');
const { importCardList } = require('../files/getContents');
const jsonValidation = require('../validation/jsonValidation');

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

function insert(rootDir){
  const query = [];
  const fileList = importCardList(rootDir);
  let dir = rootDir;

  for (let i in fileList){
    //File being read is meta.json
    if (fileList[i] == 'meta.json'){
      dir = rootDir;
      readFile((dir + fileList[i]), 'utf8', (err, contents) => {
        if (err) throw err.code;
        const meta = JSON.parse(contents);

        if (jsonValidation.metaCheck(meta)) {
          query.push(meta);
        }
        else {
          query.push(null);
        }
      });
    //Anything else that isn't meta.json
    } else {
      dir = rootDir + '/cards/';
      readFile((dir + fileList[i]), 'utf8', (err, contents) => {
        if (err) throw err.code;

        const data = JSON.parse(contents);
        jsonValidation.cardValidation(data);
        query.push(data);
      });
    }

    // Send the validated data to addToDB to add the contents into the DB
  }

  // Return an error code rather than the query itself. This function will be called from the router
  return query;

}

exports.insert = insert;