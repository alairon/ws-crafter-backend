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

/* ROOT PAGE: Home page if no parameters are sent */
app.get('/', (req, res) => {
  console.log(`[HOME] Request ${count += 1}`);
  res.send('Connection Successful');
});

/* PAGE: Delivers a page for the user to input card data */
app.use('/insert', express.static(path.join(__dirname, 'src/tools/')));
app.get('/insert', (req, res) => {
  console.log(`[INSERT] Request ${count += 1}`);
  res.sendFile(path.join(__dirname, 'src/tools', 'index.html'));
});

/* POST: Receives data to be inserted onto the server */
app.post('/insert', cors(), (req, res) => {
  console.log(`[INSERT] Request ${count += 1}`);
  createFile(req.body[0]);
  res.send('Request complete');
});

/* API: Gets list of sets available on the server */
app.get('/api/cards/', (req, res) => {
  console.log(`[CARDS] Request ${count += 1}`);
  const query = 'SELECT set_id, set_name FROM meta';
  readReq(res, query);
});

/* API: Gets list of cards from a specific set */
app.get('/api/cards/:set', (req, res) => {
  const set = req.params.set;
  console.log(`[CARDS] Request ${count += 1}`);
  const query = `SELECT * FROM cards_general WHERE set_id='${set}'`;
  readReq(res, query);
});

/* API: Gets a detailed list of character cards from a specific set */
app.get('/api/cards/:set/character', (req, res) => {
  const set = req.params.set;
  console.log(`[CARDS] Request ${count += 1}`);
  const query = `SELECT * FROM cards_general JOIN cards_character ON cards_general.card_id = cards_character.card_id WHERE set_id='${set}'`;
  readReq(res, query);
});

/* API: Gets a detailed list of event cards from a specific set */
app.get('/api/cards/:set/event/', (req, res) => {
  const set = req.params.set;
  console.log(`[CARDS] Request ${count += 1}`);
  const query = `SELECT * FROM cards_general JOIN cards_event ON cards_general.card_id = cards_event.card_id WHERE set_id='${set}'`;
  readReq(res, query);
});

/* API: Gets a detailed list of climax cards from a specific set */
app.get('/api/cards/:set/climax/', (req, res) => {
  const set = req.params.set;
  console.log(`[CARDS] Request ${count += 1}`);
  const query = `SELECT * FROM cards_general JOIN cards_climax ON cards_general.card_id = cards_climax.card_id WHERE set_id='${set}'`;
  readReq(res, query);
});

/* CORE: Alerts the server console that it is ready */
app.listen((port), () => {
  console.log(`Listening to port: ${port}`);
  console.log('Ready');
});
