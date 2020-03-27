const express = require('express');
const mysql = require('mysql');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysqlConfig = require('./sql/credentials.json');
const { createFile } = require('./src/files/writeFile');

const connection = mysql.createConnection({
  host: mysqlConfig.read.host,
  user: mysqlConfig.read.user,
  password: mysqlConfig.read.password,
  database: mysqlConfig.read.database,
});


const app = express();
const port = 3000;

let count = 0;

const readReq = (res, query) => {
  connection.query(query, (err, results) => {
    if (err) res.status(404).send(`There was an error with your request: ${err.sqlMessage}`);
    res.json(results);
  });
};

app.use(bodyParser.json());
app.use('/insert', express.static(path.join(__dirname, 'src/tools/')));

app.get('/', (req, res) => {
  console.log(`[HOME] Request ${count += 1}`);
  res.send('Connection Successful');
});

app.get('/api/insert', (req, res) => {
  console.log(`[INSERT] Request ${count += 1}`);
  res.sendFile(path.join(__dirname, 'src/tools', 'index.html'));
});

app.post('/insert', cors(), (req, res) => {
  console.log(`[INSERT] Request ${count += 1}`);
  createFile(req.body[0]);
  res.send('Request complete');
});

app.get('/cards', (req, res) => {
  console.log(`[CARDS] Request ${count += 1}`);
  const query = 'SELECT * from meta JOIN cards_general ON meta.set_id = cards_general.set_id';
  readReq(res, query);
});

app.get('/dump', (req, res) => {
  console.log(`[DUMP] Request ${count += 1}`);
  const query = 'SELECT * from meta';
  readReq(res, query);
})

app.listen((port), () => {
  console.log(`Listening to port: ${port}`);
});
