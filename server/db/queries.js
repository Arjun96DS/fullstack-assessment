const { Client } = require('pg');

const client = new Client({
    connectionString: 'postgresql://localhost:5432/your_database', 
});

async function getTodos() {
    try {
        await client.connect();
        const res = await client.query('SELECT * FROM todos');
        return res.rows;
    } catch (err) {
        console.error('Error fetching todos:', err);
        throw err;
    } finally {
        await client.end();
    }
}

async function addTodo(text) {
    try {
        await client.connect();
        const res = await client.query('INSERT INTO todos (text) VALUES ($1) RETURNING *', [text]);
        return res.rows[0];
    } catch (err) {
        console.error('Error adding todo:', err);
        throw err;
    } finally {
        await client.end();
    }
}

module.exports = {
    getTodos,
    addTodo,
};
