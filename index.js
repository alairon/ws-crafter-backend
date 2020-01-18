let express = require('express');
let app = express();

app.get('/', (req, res) => {
  console.log('Activate');
});

app.listen(3000, () => {
  console.log('Listening to port 3000');
})