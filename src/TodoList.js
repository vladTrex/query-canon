import React from 'react';
import gql from 'graphql-tag';
import {graphql} from 'react-apollo';

const TodoList = ({ data: {loading, error, todos} }) => {
    if(loading) return <p>Loading...</p>;
    if(error) return <p>{error.message}</p>;

    return(
        <ul>
            {todos.map(todo => <li key={todo.id}>{todo.title}</li>)}
        </ul>
    );
}

export const todosListQuery = gql`
    query TodosListQuery {
        todos {
            id
            title
            category
        }
    }
`;

export default graphql(todosListQuery)(TodoList);

