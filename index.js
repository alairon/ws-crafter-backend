
const express = require('express');
const mysql = require('mysql');
const path = require('path');
const bodyParser = require('body-parser');
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
    res.json(results);
  });
};

// app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());
app.use('/insert', express.static(path.join(__dirname, 'src/tools/')));

app.get('/', (req, res) => {
  console.log('Session requested');
  res.send('Connection Successful');
});

app.get('/dev/insert', (req, res) => {
  console.log('[INSERT] Database insertion form requested');
  res.sendFile(path.join(__dirname, 'src/tools', 'index.html'));
});

app.post('/insert', (req, res) => {
  console.log('[INSERT] Database file received');
  console.log(req.body);
  res.send('Request acknowledged');
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
