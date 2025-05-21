const express = require('express');
const bodyParser = require('body-parser');


const app = express();
const port = 3000;

app.use(bodyParser.json());

// Endpoint to receive webhook events
// Use get instead of post, to test in browser.
app.post('/webhook', (req, res) => {
  // Extract the event data from the request body
  const payload = req.body;

  // Process the event
  console.log('Received webhook event/payload:', payload);

  // Respond with a success status
  res.status(200).send('Webhook received');
});


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});