const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const db = require('./db/dbConfig.js');

const server = express();

server.use(express.json());
server.use(cors());

const jwtSecret= 'It is a party'

function generateToken(user) {
    const jwtPayload={
        username:user.username
    }
    
    

    const jwtOptions={
        expiresIn:'1h',
        
    }
    return jwt.sign(jwtPayload,jwtSecret,jwtOptions);
}

server.get('/', (req, res) => {
  res.send('Its Alive!');
});

server.post('/register', (req, res) => {
    const credentials = req.body;

    const hash = bcrypt.hashSync(credentials.password, 14);
    credentials.password = hash;
   
    db('users')
        .insert(credentials)
        .then(ids => {
        const id = ids[0];
        res.status(201).json({ newUserId: id });
   })
   .catch(err => {
       res.status(500).json({err});
   })
})


server.listen(6000, () => console.log('\nrunning on port 6000\n'));