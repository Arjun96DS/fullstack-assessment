import React, { useState } from 'react';

const HomePage = () => {
  const [todo, setTodo] = useState('');

  const handleAddTodo = async () => {
    if (todo) {
      await fetch('http://localhost:5001/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: todo }),
      });
      setTodo('');
      
    }
  };

  return (
    <div>
      <h1>Todo List</h1>
      <input
        type="text"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
        placeholder="Add a new todo"
      />
      <button onClick={handleAddTodo}>Add Todo</button>
      <a href="/todos">View Todos</a>
    </div>
  );
};

export default HomePage;
