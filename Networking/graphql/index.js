const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { graphqlHTTP } = require("express-graphql");
const rateLimit = require('express-rate-limit');

const isAuth = require("./middlewares/auth");
const schema = require("./Schemas");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 4000;

// Configure rate limiters
const queryLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many queries from this IP, please try again after 15 minutes'
});

const mutationLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 50, // limit each IP to 50 mutations per windowMs
  message: 'Too many mutations from this IP, please try again after 15 minutes'
});

app.use(cors());
app.use(bodyParser.json());

// app.use('/', (req, res) => {
//   res.send("Hello from GRAPHQL server");
// });
app.use(isAuth);

// Rate limiting middleware based on operation type
const graphqlRateLimiter = (req, res, next) => {
  console.log("Request Body:", req.body);
  console.log("Request Query:", req.query);
  const query = req?.body?.query || '';
  if (query.trim().startsWith('mutation')) {
    return mutationLimiter(req, res, next);
  }
  return queryLimiter(req, res, next);
};

app.use(
  "/graphql",
  graphqlRateLimiter,
  graphqlHTTP({
    schema,
    graphiql: true,
    customFormatErrorFn: (error) => {
      return {
        message: error.message,
        locations: error.locations,
        stack: error.stack ? error.stack.split('\n') : [],
        path: error.path,
      };
    },
  })
);

mongoose.connect(
  process.env.MONGO_URI
).then(async () => {
  console.log(`Connected to MongoDB`);
  app.listen(PORT, () => {
    console.log('GRAPHQL SERVER IS RUNNING ON PORT', PORT);
  });
}).catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});
