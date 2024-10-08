# fullstack-assessment
# Full-Stack Assessment

## Overview

This project is a full-stack application with a Next.js frontend, Express backend, and PostgreSQL database. The application includes user authentication, post creation, comment functionality, and a to-do list.

## Project Structure

- **Frontend**: Next.js application
- **Backend**: Express.js server
- **Database**: PostgreSQL

## Frontend URLs

- **Home Page**: [http://localhost:3000](http://localhost:3000)
- **Login Page**: [http://localhost:3000/login](http://localhost:3000/login)
- **Register Page**: [http://localhost:3000/register](http://localhost:3000/register)
- **Add Post Page**: [http://localhost:3000/posts](http://localhost:3000/posts)
- **Todos Page**: [http://localhost:3000/todos](http://localhost:3000/todos)
- **Delete Post Page**: [http://localhost:3000/DeletePost](http://localhost:3000/DeletePost)
- **Create Comment**: [http://localhost:3000/create-comment](http://localhost:3000/create-comment)
- **Delete Comment Page**: [http://localhost:3000/DeleteComment](http://localhost:3000/DeleteComment)

## Backend API Endpoints

### Todos

- **GET /todos**: Fetch all todos
  - **URL**: `http://localhost:5001/todos`
  - **Method**: `GET`

- **POST /todos**: Add a new todo
  - **URL**: `http://localhost:5001/todos`
  - **Method**: `POST`
  - **Body**: `{ "text": "your_todo_text" }`

### Posts

- **POST /api/posts**: Create a new post
  - **URL**: `http://localhost:5001/api/posts`
  - **Method**: `POST`
  - **Body**: `{ "user_id": "user_id", "title": "post_title", "content": "post_content" }`

- **GET /api/posts**: Fetch all posts
  - **URL**: `http://localhost:5001/api/posts`
  - **Method**: `GET`

### Comments

- **POST /api/comments**: Add a new comment to a post
  - **URL**: `http://localhost:5001/api/comments`
  - **Method**: `POST`
  - **Body**: `{ "post_id": "post_id", "author": "comment_author", "content": "comment_content" }`

- **GET /api/comments**: Fetch all comments
  - **URL**: `http://localhost:5001/api/comments`
  - **Method**: `GET`

### Authentication

- **POST /login**: User login
  - **URL**: `http://localhost:5001/login`
  - **Method**: `POST`
  - **Body**: `{ "username": "your_username", "password": "your_password" }`

- **POST /api/users/register**: User registration
  - **URL**: `http://localhost:5001/api/users/register`
  - **Method**: `POST`
  - **Body**: `{ "username": "your_username", "password": "your_password" }`

## Setup and Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>

2. **Install dependencies:**
    cd <project-directory>
    npm install 
3. **Clone the repository:**
    DB_USER=
    DB_HOST=
    DB_NAME=
    DB_PASSWORD=
    DB_PORT=5432
4. **Clone the repository:**
    node server/db/initDb.js

5. **Clone the repository:**
    npm run dev

6. **Clone the repository:**
    node server.js


Testing with Postman

You can use Postman to test the API endpoints. Make sure your backend server is running at http://localhost:5001.

Example Postman Requests:
GET /todos: Test fetching all todos.
POST /todos: Test adding a new todo.
POST /api/posts: Test creating a new post.
GET /api/posts: Test fetching all posts.
POST /api/comments: Test adding a new comment.
GET /api/comments: Test fetching all comments.
POST /login: Test user login.
POST /api/users/register: Test user registration.


This `README.md` file provides a basic overview of my project, including frontend and backend URLs, as well as setup instructions and usage with Postman. If you need any additional details or modifications, just let me know!
