// api server that responds with a random joke

const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const jokes = require('./jokes.json');

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.get('/jokes', (req, res) => {
  res.json(jokes);
});

app.get('/jokes/:id', (req, res) => {
  const { id } = req.params;
  const joke = jokes.find((joke) => joke.id === id);
  res.json(joke);
  console.log(joke);
  console.log(id);
  
