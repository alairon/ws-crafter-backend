require('dotenv').config();
const { Pool } = require('pg');

const connection = new Pool({
  connectionString: process.env.DATABASE_URL
});

connection.connect((err) => {
  if (err){
    console.error(err);
  }
  else{
    console.log('Database successfully connected.');
  }
});

const readReq = (res, query) => {
  connection.query(query, (err, results) => {
    if (err) res.status(400).send(`There was an error with your request: ${err}`);
    if (results == {}) res.status(204).json(results);
    res.json(results.rows);
  });
};

exports.readReq = readReq;