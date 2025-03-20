
const express = require('express');
const bodyParser = require('body-parser');

// import express from 'express'; Change the package.json to use "type": "module" to use this syntax

const app = express();
const port = process.env.PORT || 3001;

// Initialize data value;
let data = 'Initial Data';

// Array to store waiting client connections
const waitingClients = [];

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

/**
 * Long polling endpoint to get data
 * Clients connect and wait for data changes
 */
app.get('/getData', (req, res) => {

  console.log(`Clients last known data: ${req.query.lastData}`);
  console.log(`Current data on server: ${data}`);

  // If data has changed since client's last request, send the new data
  if (data !== req.query.lastData) {
    console.log(`Data has changed. Sending new data to client`);
    res.json({ data });
  } else {
    // If no change, hold the connection and wait for data change
    console.log(`Data has not changed. Holding the connection
    and waiting for data change`);
    waitingClients.push(res);

    console.log(`Number of waiting clients: ${waitingClients.length}`);
  }
});

app.get('/updateData', (req, res) => {
  newData = req.query.data;
  console.log(`Old data: ${data}`);
  console.log(`New data to update: ${newData}`);

  data = newData;

  // Send the new data to all waiting clients
  console.log(`Sending updated data to all ${waitingClients.length} waiting clients`);
  while (waitingClients?.length > 0) {
    const client = waitingClients.pop();
    client.json({ data });
  }

  // Clear the waiting list
  waitingClients.length = 0;
  console.log(`Waiting clients cleared`);

  res.send({ success: true, message: 'Data updated successfully' });
});

app.listen(port, () => {
  console.log(`Server for long polling is listening at http://localhost:${port}`);
});

