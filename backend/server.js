const express = require('express');

const app = express();

app.get('/', (_, res) => {
  res.send('Pair Pressure!');
});

app.listen(3000, () => console.log('Server is listening on localhost:3000'));
