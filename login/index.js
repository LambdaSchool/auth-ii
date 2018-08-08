const express = require('express');
const router = express.Router();
const db = require('../data/helpers/userDb');
const bcrypt = require('bcryptjs');
const mw = require('../data/middleware/index');

// login
router.post('/', async (req, res) => {
    try {
        const newRecord = { ...req.body };
        const record = await db.get(newRecord);
        
        if(record.username && bcrypt.compareSync(newRecord.password, record.password)) {
            const token = mw.genToken(record);

            // res.status(200).json({message: 'Login Successful'});
            res.status(200).json({token});
        } else {
            res.status(401).json({message: 'Incorrect Credentials'});
        }

    } catch (err) {
        res.status(500).json({error: 'Server Error'});
    }
});

module.exports = router;
