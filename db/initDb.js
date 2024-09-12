const { Client } = require('pg');

// PostgreSQL connection details
const client = new Client({
  user: '',
  host: '',
  database: '',
  password: '',
  port: 5432, // Default PostgreSQL port
});

client.connect();

const setupDatabase = async () => {
  try {
    console.log("Connected to the database.");

    // Create the "todos" table if it doesn't exist
    await client.query(`
      CREATE TABLE IF NOT EXISTS todos (
        id SERIAL PRIMARY KEY,
        text VARCHAR(255) UNIQUE NOT NULL
      );
    `);

    // Insert example data into the "todos" table
    await client.query(`
      INSERT INTO todos (text)
      VALUES 
      ('Buy groceries'),
      ('Walk the dog'),
      ('Read a book')
      ON CONFLICT (text) DO NOTHING;
    `);

    console.log("Example data inserted.");
  } catch (err) {
    console.error('Error executing query', err);
  } finally {
    client.end();
    console.log("Database connection closed.");
  }
};

setupDatabase();
