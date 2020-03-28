import {compose, branch, renderComponent, withHandlers} from 'recompose';
import gql from 'graphql-tag';
import {graphql} from 'react-apollo';

import TodoList from '../components/TodoList';
import LoadingPlaceholder from '../components/common/LoadingPlaceholder';
import ErrorPlaceholder from '../components/common/ErrorPlaceholder';

export const todosListQuery = gql`
    query TodosListQuery {
        todos {
            id
            title
            category
        }
    }
`;

export const onRemoveTodo = gql`
    mutation removeTodo($todoId: String!) {
        removeTodo(todoId: $todoId) {
            success
        }
    }
`;

const renderWhileLoadingHOC = (component, propName = 'data') =>
  branch(
    props => props[propName].loading,
    renderComponent(component),
  );

const renderForErrorHOC = (component, propName = "data") =>
  branch(
    props => props[propName].error,
    renderComponent(component),
  );

const withHandlersHOC = withHandlers({
    onRemove: props => todoId => {
        const { removeTodoMutation } = props;
        removeTodoMutation({
            variables: {
                todoId
            },
            update(cache) {
                const cachedData = cache.readQuery({
                    query: todosListQuery
                });

                const {todos} = cachedData;
                const updatedData = todos
                    .filter(todo => todo.id !== todoId);

                cache.writeQuery({
                    query: todosListQuery,
                    data: {
                        todos: updatedData
                    }
                });
            }
        });
    }
});

const enhancedComponent = compose(
    graphql(todosListQuery),
    graphql(onRemoveTodo, {
        name: 'removeTodoMutation'
    }),
    renderForErrorHOC(ErrorPlaceholder),
    renderWhileLoadingHOC(LoadingPlaceholder),
    withHandlersHOC
)(TodoList);

export default enhancedComponent;