import React from 'react';

const TodoList = ({data: {error, todos}, onRemove}) => {
    if (error) return <p>{error.message}</p>;

    return (
        <ul>
            {todos.map(todo => <li key={todo.id}>{todo.title}
                <button onClick={() => onRemove(todo.id)}>remove</button>
            </li>)}
        </ul>
    );
};

export default TodoList;

