const express = require('express');
const router = express.Router();
const { Client } = require('pg');

const client = new Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

client.connect();

router.post('/', async (req, res) => {
    const { post_id, author, content } = req.body;
    try {
        const result = await client.query(
            'INSERT INTO comments (post_id, author, content) VALUES ($1, $2, $3) RETURNING *',
            [post_id, author, content]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error creating comment:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/', async (req, res) => {
    try {
        const result = await client.query('SELECT * FROM comments');
        res.status(200).json(result.rows);
    } catch (error) {
        console.error('Error fetching comments:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
