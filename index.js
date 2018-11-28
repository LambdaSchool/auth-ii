require('dotenv').config();
const express = require('express');
const helmet = require("helmet");
const cors = require('cors');
const knex = require("knex");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const knexConfig = require("./knexfile");
const db = knex(knexConfig.development);
const server = express();

server.use(express.json());
server.use(cors());
server.use(helmet());

server.get("/", (req, res) => {
    res.status(200).json({api: "running"});
})

const port = 9001;

server.listen(port, function() {
    console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});