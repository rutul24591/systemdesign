const express = require('express');
const app = express();
const { join } = require('node:path');


app.get('/sse', (req, res) => {
  // setup sse logic
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  res.write('data: Welcome to Server sent event \n\n');
  res.write('data: This is a test message \n\n');


  const intervalId = setInterval(() => {
    const data = new Date().toLocaleTimeString();
    res.write(`data: ${data} \n\n`);
  }, 4000);

  req.on('close', () => {
    clearInterval(intervalId);
  });
});

app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'index.html'));
});


const port = 3000;

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});