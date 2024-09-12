// const express = require('express');
// const { Client } = require('pg');
// const router = express.Router();

// // PostgreSQL client setup
// const client = new Client({
//   user: 'postgres',
//   host: 'localhost',
//   database: 'todo_db',
//   password: '1234567',
//   port: 5432,
// });

// client.connect();

// // Get all todos
// router.get('/', async (req, res) => {
//   try {
//       const todos = await getTodos();
//       res.json(todos);
//   } catch (err) {
//       res.status(500).json({ error: 'Failed to fetch todos' });
//   }
// });

// router.post('/', async (req, res) => {
//   const { text } = req.body;
//   try {
//       const newTodo = await addTodo(text);
//       res.status(201).json(newTodo);
//   } catch (err) {
//       res.status(500).json({ error: 'Failed to add todo' });
//   }
// });

// // Delete a todo by ID
// router.delete('/:id', async (req, res) => {
//   const { id } = req.params;
//   try {
//       const result = await pool.query('DELETE FROM todos WHERE id = $1 RETURNING *', [id]);
//       if (result.rowCount === 0) {
//           return res.status(404).json({ error: 'Todo not found' });
//       }
//       res.json(result.rows[0]);
//   } catch (error) {
//       console.error('Error deleting todo:', error);
//       res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// module.exports = router;
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

router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    try {
        const result = await client.query(
            'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *',
            [username, password]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
