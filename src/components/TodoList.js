import React from 'react';

const TodoList = ({ data: {error, todos} }) => {
    if(error) return <p>{error.message}</p>;

    return(
        <ul>
            {todos.map(todo => <li key={todo.id}>{todo.title}</li>)}
        </ul>
    );
}

export default TodoList;

