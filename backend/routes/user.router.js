const express = require('express');
const fs = require('fs');
const path = require('path');
const pool = require('../modules/pool');
const router = express.Router();



router.get('/', async (req, res) => {
    try {
        // first user will be the user used to interact with the web app durring v0.
        const { rows: [ user ] } = pool.query(`
            SELECT * FROM users
        `);
        res.status(200).json(user);
    } catch (error) {
        console.error(error);
    }
});



router.post('/', async(req, res) => {
    try {
        await pool.query(`
            INSERT INTO users (username, email)
            VALUES ($1, $2)
        `, [username, email]
        );
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        if (error.code === '23505') {
        if (error.constraint === 'users_username_key') {
            return res.status(400).json({ error: 'Username already taken' });
        }
        if (error.constraint === 'users_email_key') {
            return res.status(400).json({ error: 'Email already in use' });
        }
    }
        console.error(error);
        res.status(500).json({ error: 'Something went wrong' });
    }
});



module.exports = router;