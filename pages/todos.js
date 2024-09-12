import React from 'react';

const Todos = ({ todos, error }) => {
    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div>
            <h1>Todo Items from API</h1>
            <ul>
                {todos.map(todo => (
                    <li key={todo.id}>{todo.text}</li>
                ))}
            </ul>
            <a href="/">Go Back to Home</a>
        </div>
    );
};

export async function getServerSideProps() {
    try {
        const res = await fetch('http://localhost:5001/todos');
        if (!res.ok) {
            throw new Error('Failed to fetch todos');
        }
        const todos = await res.json();
        return { props: { todos } };
    } catch (error) {
        return { props: { todos: [], error: error.message } };
    }
}

export default Todos;
