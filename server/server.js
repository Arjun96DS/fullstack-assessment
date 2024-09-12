const cors = require('cors');
const express = require('express');
const { Pool } = require('pg');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const app = express();
const port = 5001;

// PostgreSQL connection setup
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'todo_db',
  password: 'postgres',
  port: 5432,
});

// Middleware setup
app.use(cors({
  origin: 'http://localhost:3000', // Replace with your frontend origin
  credentials: true // Allow credentials (cookies) to be sent with requests
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({ secret: 'secret', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// Middleware to log requests
const requestLogger = (req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
};
app.use(requestLogger);

// Passport.js local strategy
passport.use(new LocalStrategy(async (username, password, done) => {
  try {
    const result = await pool.query('SELECT * FROM users WHERE username = $1 AND password = $2', [username, password]);
    if (result.rows.length > 0) {
      return done(null, result.rows[0]);
    } else {
      return done(null, false, { message: 'Invalid credentials' });
    }
  } catch (error) {
    return done(error);
  }
}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
    done(null, result.rows[0]);
  } catch (error) {
    done(error);
  }
});

// Authentication route
app.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) return next(err);
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });
    req.logIn(user, (err) => {
      if (err) return next(err);
      return res.json({ message: 'Login successful' });
    });
  })(req, res, next);
});

// Authentication middleware
const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) return next();
  res.status(401).json({ message: 'Unauthorized' });
};

// Create comments table if not exists
app.post('/api/comments', isAuthenticated, async (req, res) => {
  const { post_id, author, content } = req.body;
  try {
      const result = await pool.query(
          'INSERT INTO comments (post_id, author, content) VALUES ($1, $2, $3) RETURNING *',
          [post_id, author, content]
      );
      res.status(201).json(result.rows[0]);
  } catch (error) {
      console.error('Error creating comment:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Routes
app.post('/api/users/register', async (req, res) => {
  const { username, password } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *',
      [username, password]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/api/posts', isAuthenticated, async (req, res) => {
  const { username, title, content } = req.body;

  try {
    // Fetch user ID based on username
    const userResult = await pool.query('SELECT id FROM users WHERE username = $1', [username]);
    if (userResult.rows.length === 0) {
      return res.status(400).json({ error: 'Invalid username' });
    }
    
    const userId = userResult.rows[0].id;

    // Insert the post
    const result = await pool.query(
      'INSERT INTO posts (user_id, title, content) VALUES ($1, $2, $3) RETURNING *',
      [userId, title, content]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/posts', isAuthenticated, async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM posts');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Delete a post
app.delete('/api/posts/:id', isAuthenticated, async (req, res) => {
  const { id } = req.params;
  try {
      await pool.query('DELETE FROM posts WHERE id = $1', [id]);
      res.sendStatus(204);
  } catch (error) {
      console.error('Error deleting post:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Delete a comment
app.delete('/api/comments/:id', isAuthenticated, async (req, res) => {
  const { id } = req.params;
  try {
      await pool.query('DELETE FROM comments WHERE id = $1', [id]);
      res.sendStatus(204);
  } catch (error) {
      console.error('Error deleting comment:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.delete('/api/posts/:id', isAuthenticated, async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM posts WHERE id = $1', [id]);
    res.sendStatus(204);
  } catch (error) {
    console.error('Error deleting post:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});