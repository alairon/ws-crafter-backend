require('dotenv').config();
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

const { readReq } = require('./src/db/select');
const { createFile } = require('./src/files/writeFile');
const { insert } = require('./src/db/insert-psql');

const app = express();
const port = process.env.PORT || process.env.LOCAL_PORT;
const corsConfig = {
  origin: 'https://ws-crafter-backend.herokuapp.com',
  optionsSuccessStatus: 200
};



/* Tracks the number of requests received */
let serverReq = 0;

/* Use the JSON bodyParser */
app.use(bodyParser.json());

/* Force all non-HTTPS protocols to HTTPS */
app.use((req, res, next) => {
  if (req.headers['x-forwarded-proto'] !== 'https') {
    const sslUrl = ['https://ws-crafter-backend.herokuapp.com', req.url].join('');
    return res.redirect(sslUrl);
  }

  return next();
});

/* ROOT PAGE: Home page if no parameters are sent */
app.use('/', express.static(path.join(__dirname, 'src/pages')));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'src/pages', 'index.html'));
});

/* PAGE: Delivers a page for the user to input card data */
app.use('/cards', express.static(path.join(__dirname, 'src/tools')));
app.get('/cards', (req, res) => {
  res.sendFile(path.join(__dirname, 'src/tools', 'index.html'));
});

/* POST: Receives data to be inserted onto the server */
app.post('/api/cards', cors(corsConfig), (req, res) => {
  const result = createFile(req.body[0]);

  console.log(`[POST ${++serverReq}] - /api/cards`);
  // Return HTTP 201 (successful entry) or 422 (bad entry)
  (result == 0) ? res.status(201).send('Request complete'): res.status(422).json(result);
});

/* API: Gets basic info of all the cards available on the server database */
app.get('/api/cards', (req, res) => {
  const query = 'SELECT set_id, set_name, card_id, en_name FROM cards';

  console.log(`[GET ${++serverReq}] - /api/cards/`);
  readReq(res, query);
});

/* API: Gets a detailed list of all cards from a specific set */
app.get('/api/cards/:set', (req, res) => {
  const set = req.params.set;
  const query = `SELECT * FROM cards WHERE set_id ~* '${set}'`;

  console.log(`[GET ${++serverReq}] - /api/cards/${set}`);
  readReq(res, query);
});

/* API: Gets a detailed list of character cards from a specific set */
app.get('/api/cards/:set/character', (req, res) => {
  const set = req.params.set;
  const query = `SELECT * FROM characters WHERE set_id ~* '${set}'`;

  console.log(`[GET ${++serverReq}] - /api/cards/${set}/character`);
  readReq(res, query);
});

/* API: Gets a detailed list of event cards from a specific set */
app.get('/api/cards/:set/event', (req, res) => {
  const set = req.params.set;
  const query = `SELECT * FROM events WHERE set_id ~* '${set}'`;

  console.log(`[GET ${++serverReq}] - /api/cards/${set}/event`);
  readReq(res, query);
});

/* API: Gets a detailed list of climax cards from a specific set */
app.get('/api/cards/:set/climax', (req, res) => {
  const set = req.params.set;
  const query = `SELECT * FROM climaxes WHERE set_id ~* '${set}'`;

  console.log(`[GET ${++serverReq}] - /api/cards/${set}/climax`);
  readReq(res, query);
});

/* API: Gets list of cards matching the string from a specific set */
app.get('/api/cards/:set/:cardNo', (req, res) => {
  const setID = req.params.set;
  const cardNo = req.params.cardNo;
  const query = `SELECT card_id, en_name, card_type FROM cards WHERE set_id ~* '${setID}' AND card_id LIKE '%-%${cardNo}%'`;

  console.log(`[GET ${++serverReq}] - /api/cards/${setID}/${cardNo}`);
  readReq(res, query);
});

/* API: Gets list of sets on the database */
app.get('/api/sets', (req, res) => {
  const query = `SELECT set_id, set_name, set_type, series_name FROM sets GROUP BY set_id`;

  console.log(`[GET ${++serverReq}] - /api/sets/`);
  readReq(res, query);
});

/* API: Gets list of cards from a specific set */
app.get('/api/sets/:set', (req, res) => {
  const set = req.params.set;
  const query =  `SELECT * FROM sets WHERE set_id ~*'${set}' GROUP BY set_id`;

  console.log(`[GET ${++serverReq}] - /api/sets/${set}`);
  readReq(res, query);
});

/* API: Updates the contents of the database with the specified set */
app.post('/api/sets/:set/:key', (req, res) => {
  const set = req.params.set;
  const key = req.params.key;
  insert(`./data/${req.params.set}`);

  if (key === process.env.UNLOCK_KEY) {
    console.log(`[POST] - /api/update/${set}`);
    res.status(200).send(`Operation complete for ${set}`);
  }
  else {
    res.status(403).send(`Invalid unlock key. Database contents in ${set} has not been modified.`);
  }
});

/* CORE: Alerts the server console that it is ready */
app.listen((port), () => {
  console.log('Welcome to WS Crafter - Server Build v13b');
  console.log(`This server is listening to port: ${port}`);
  console.log('-----');
});
