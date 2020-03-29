import React from 'react';

const TodoList = ({data: {error, products}, onRemove}) => {
    if (error) return <p>{error.message}</p>;

    return (
        <ul>
            {products.map(product => <li key={product._id}>{product.title}
                <button onClick={() => onRemove(product._id)}>remove</button>
            </li>)}
        </ul>
    );
};

export default TodoList;

