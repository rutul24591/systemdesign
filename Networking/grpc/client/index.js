const express = require('express');
const bodyParser = require('body-parser');

const client = require('./client');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));



app.get('/', (req, res) => {
  client.getAll(null, (error, data) => {
    if (!error) {
      res.json(data.customers);
    } else {
      res.status(500).json({ error });
    }
  });
});

app.post('/create', (req, res) => {
  let newCustomer = {
    name: req.body.name,
    age: req.body.age,
    address: req.body.address
  }

  client.insert(newCustomer, (error, data) => {
    if (!error) {
      console.log("Customer created successfully", data);
      res.send({ message: 'Customer created successfully' });
      // res.json(data);
    } else {
      res.status(500).json({ error });
    }
  })
});

app.post('/update', (req, res) => {
  const updatedCustomer = {
    id: req.body.id,
    name: req.body.name,
    age: req.body.age,
    address: req.body.address
  }

  client.update(updatedCustomer, (error, data) => {
    if (!error) {
      console.log("Customer updated successfully", data);
      res.send({ message: 'Customer updated successfully' });
    } else {
      res.status(500).json({ error });
    }
  });
});

app.post('/remove', (req, res) => {
  const customer_id = req.body.id;

  client.remove({ id: customer_id }, (error, data) => {
    if (!error) {
      console.log("Customer removed successfully", data);
      res.send({ message: 'Customer removed successfully' });
    } else {
      res.status(500).json({ error });
    }
  });
});



// TODO: Expose REST call which will internally call gRPC server function using.
const PORT = process.env.PORT || 30044;

app.listen(PORT, () => {
  console.log(`gRPC client server is listening at http://localhost:${PORT}`);
});