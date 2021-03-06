require('dotenv').config();
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

const { readReq } = require('./src/db/select');
const { createFile } = require('./src/files/writeFile');

const app = express();
const port = process.env.port || process.env.LOCAL_PORT;


let serverReq = 0;

app.use(bodyParser.json());

/* ROOT PAGE: Home page if no parameters are sent */
app.get('/', (req, res) => {
  res.send('Connection Successful');
});

/* PAGE: Delivers a page for the user to input card data */
app.use('/cards', express.static(path.join(__dirname, 'src/tools')));
app.get('/cards', (req, res) => {
  res.sendFile(path.join(__dirname, 'src/tools', 'index.html'));
});

/* POST: Receives data to be inserted onto the server */
app.post('/api/cards/', (req, res) => {
  const result = createFile(req.body[0]);

  console.log(`[POST ${++serverReq}] - /api/cards/`);
  // Return HTTP 201 (successful entry) or 422 (bad entry)
  (result == 0) ? res.status(201).send('Request complete'): res.status(422).json(result);
});

/* API: Gets list of sets available on the server */
app.get('/api/cards/', cors(), (req, res) => {
  const query = 'SELECT set_id, set_name FROM sets GROUP BY set_id';

  console.log(`[GET ${++serverReq}] - /api/cards/`);
  readReq(res, query);
});

/* API: Gets list of sets on the database */
app.get('/api/sets', (req, res) => {
  const query = `SELECT * FROM sets GROUP BY set_id`;

  console.log(`[GET ${++serverReq}] - /api/sets/`);
  readReq(res, query);
});

/* API: Gets list of cards from a specific set */
app.get('/api/sets/:set', (req, res) => {
  const set = req.params.set;
  const query =  `SELECT * FROM sets WHERE set_id='${set}'`;

  console.log(`[GET ${++serverReq}] - /api/sets/${set}`);
  readReq(res, query);
});

/* API: Gets a detailed list of character cards from a specific set */
app.get('/api/sets/:set/character', (req, res) => {
  const set = req.params.set;
  const query = `SELECT * FROM characters WHERE set_id='${set}'`;

  console.log(`[GET ${++serverReq}] - /api/${set}/character`);
  readReq(res, query);
});

/* API: Gets a detailed list of event cards from a specific set */
app.get('/api/sets/:set/event', (req, res) => {
  const set = req.params.set;
  const query = `SELECT * FROM events WHERE set_id='${set}'`;

  console.log(`[GET ${++serverReq}] - /api/${set}/event`);
  readReq(res, query);
});

/* API: Gets a detailed list of climax cards from a specific set */
app.get('/api/sets/:set/climax', (req, res) => {
  const set = req.params.set;
  const query = `SELECT * FROM climaxes WHERE set_id='${set}'`;

  console.log(`[GET ${++serverReq}] - /api/${set}/climax`);
  readReq(res, query);
});

/* API: Gets list of cards matching the string from a specific set */
app.get('/api/cards/:set/:cardNo', (req, res) => {
  const setID = req.params.set;
  const cardNo = req.params.cardNo;
  const query = `SELECT card_id, en_name, card_type FROM cards WHERE set_id='${setID}' AND card_id LIKE '%-%${cardNo}%'`;

  console.log(`[GET ${++serverReq}] - /api/cards/${setID}/${cardNo}`);
  readReq(res, query);
});

app.get('/api/update/:set', (req, res) => {
  const set = req.params.set;
  res.status(200).send(`Operation complete for ${set}`);
});

/* CORE: Alerts the server console that it is ready */
app.listen((port), () => {
  console.log('Welcome to ws-crafter');
  console.log(`This server is listening to port: ${port}`);
  console.log('-----');
  console.log('Ready');
});
