const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3001;  // Port number for the server to listen on

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


// Define the routes
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.listen(PORT, () => {
  console.log(`REST server is listening at 127.0.0.1:${PORT}`);
});