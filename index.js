/* eslint no-console: 0 */

const express = require('express');
const mysql = require('mysql');
const path = require('path');
const mysqlConfig = require('./sql/credentials.json');

const connection = mysql.createConnection({
  host: mysqlConfig.read.host,
  user: mysqlConfig.read.user,
  password: mysqlConfig.read.password,
  database: mysqlConfig.read.database,
});


const app = express();
const port = 3000;

let count = 0;

const readReq = (res) => {
  let query = 'SELECT * from cards_general';
  connection.query(query, (err, results) => {
    if (err) res.status(404).send(`There was an error with your request: ${err.sqlMessage}`);
    res.send(results);
  });
};

app.get('/', (req, res) => {
  console.log('Session requested');
  res.send('Connection Successful');
});

app.use('/insert', express.static(path.join(__dirname, 'src/tools/')));
app.get('/dev/insert', (req, res) => {
  console.log('Writing Requested');
  res.sendFile(path.join(__dirname, 'src/tools', 'dataCreation.html'));
});

app.get('/test', (req, res) => {
  console.log('Test requested');
  console.log(`[TEST] Request received ${count += 1} times this session.`);
  const query = 'SELECT * from cards_general';
  readReq(res, query);
});

app.listen((port), () => {
  console.log(`Listening to port: ${port}`);
});
