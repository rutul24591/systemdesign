
const express = require('express');
const bodyParser = require('body-parser');

// import express from 'express'; Change the package.json to use "type": "module" to use this syntax

const app = express();
const port = process.env.PORT || 3001;
let data = 'Initial Data';


app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/getData', (req, res) => {
  res.send({
    data
  });
});

app.get('/updateData', (req, res) => {
  data = 'Some updated data';
  res.send({ data });
});

app.listen(port, () => {
  console.log(`Server for short polling is listening at http://localhost:${port}`);
});

