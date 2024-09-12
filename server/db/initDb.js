const { Client } = require('pg');

const client = new Client({
    user: '',           // PostgreSQL username
    host: 'localhost',          // PostgreSQL server host
    database: '',        // Your PostgreSQL database name
    password: '',       // Your PostgreSQL password
    port: 5432,                 // PostgreSQL server port
});

async function setupDatabase() {
    try {
        await client.connect();

        // Create users table
        await client.query(`
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                username VARCHAR(50) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL
            );
        `);

        // Create posts table
        await client.query(`
            CREATE TABLE IF NOT EXISTS posts (
                id SERIAL PRIMARY KEY,
                user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
                title VARCHAR(255) NOT NULL,
                content TEXT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);

        // Create comments table
        await client.query(`
            CREATE TABLE IF NOT EXISTS comments (
                id SERIAL PRIMARY KEY,
                post_id INTEGER REFERENCES posts(id) ON DELETE CASCADE,
                author VARCHAR(50) NOT NULL,
                content TEXT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);

        console.log('Database schema created successfully');
    } catch (err) {
        console.error('Error setting up the database:', err);
    } finally {
        await client.end();
    }
}

setupDatabase();
