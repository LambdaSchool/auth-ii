const express = require('express');
const bcrypt = require('bcryptjs');
const db = require('./data/db');
const jwt = require('jsonwebtoken');
const server = express();

server.use(express.json());

server.post('/api/register', (req, res) => {
  const user = req.body;
  const hash = bcrypt.hashSync(user.password, 14);
  user.password = hash;

  db('users')
    .insert(user)
    .then((ids) => {
      db('users')
        .where({ id: ids[0] })
        .first()
        .then((user) => {
          const token = generateToken(user);
          res.status(201).json(token);
        });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
});

const secret = 'I love icecream!';

function generateToken(user) {
  const payload = {
    username: user.username
  };

  const options = {
    expiresIn: '1h',
    jwtid: '8728391'
  };

  return jwt.sign(payload, secret, options);
}

const port = 5000;
server.listen(port, () => {
  console.log(`server on http://localhost:${port}`);
});
