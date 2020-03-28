const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

const { readReq } = require('./src/db/select');
const { createFile } = require('./src/files/writeFile');

const app = express();
const port = 3000;

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
app.post('/api/cards/', cors(), (req, res) => {
  createFile(req.body[0]);
  res.status(201).send('Request complete');
});

/* API: Gets list of sets available on the server */
app.get('/api/cards/', (req, res) => {
  const query = 'SELECT set_id, set_name FROM meta';
  readReq(res, query);
});

/* API: Gets list of cards from a specific set */
app.get('/api/cards/:set', (req, res) => {
  const set = req.params.set;
  const query = `SELECT card_id, en_name, card_type FROM cards_general WHERE set_id='${set}'`;
  readReq(res, query);
});

/* API: Gets a detailed list of character cards from a specific set */
app.get('/api/cards/:set/character', (req, res) => {
  const set = req.params.set;
  const query = `SELECT * FROM cards_general JOIN cards_character ON cards_general.card_id=cards_character.card_id WHERE set_id='${set}'`;
  readReq(res, query);
});

/* API: Gets a detailed list of event cards from a specific set */
app.get('/api/cards/:set/event', (req, res) => {
  const set = req.params.set;
  const query = `SELECT * FROM cards_general JOIN cards_event ON cards_general.card_id=cards_event.card_id WHERE set_id='${set}'`;
  console.log(query);
  readReq(res, query);
});

/* API: Gets a detailed list of climax cards from a specific set */
app.get('/api/cards/:set/climax', (req, res) => {
  const set = req.params.set;
  const query = `SELECT * FROM cards_general JOIN cards_climax ON cards_general.card_id=cards_climax.card_id WHERE set_id='${set}'`;
  readReq(res, query);
});

/* API: Gets list of cards matching the string from a specific set */
app.get('/api/cards/:set/:cardNo', (req, res) => {
  const setID = req.params.set;
  const cardNo = req.params.cardNo;
  const query = `SELECT card_id, en_name, card_type FROM cards_general WHERE set_id='${setID}' AND card_id LIKE '%-%${cardNo}%'`;
  readReq(res, query);
});

/* CORE: Alerts the server console that it is ready */
app.listen((port), () => {
  console.log(`Listening to port: ${port}`);
  console.log('Ready');
});
