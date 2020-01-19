let express = require('express');
let test = require('./db/readDB.js');
let app = express();
const port = 3000;

app.get('/', (req, res) => {
  console.log('Session requested');
  res.send('Hello!!!!');
  res.send(test);
});

app.listen(port, () => {
  console.log('Listening to port 3000');
})