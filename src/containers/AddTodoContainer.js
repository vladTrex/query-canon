import {withHandlers, compose, branch, renderComponent} from 'recompose';
import gql from 'graphql-tag';
import {graphql} from 'react-apollo';

import AddTodo from '../components/AddTodo';
import LoadingPlaceholder from '../components/common/LoadingPlaceholder';
import {todosListQuery} from './TodoListContainer';

const createTodo = gql`
    mutation addTodo($title: String!, $category: String!){
        addTodo(title: $title, category: $category){
            id,
            title,
            category
        }
    }
`;

const renderWhileLoadingHOC = (component, propName = 'result') =>
  branch(
    props => props[propName].loading,
    renderComponent(component),
  );

const withHandlersHOC = withHandlers({
    onSave: props => (title, category) => {
        const {mutate} = props;

        mutate({
            variables: {title, category},
            update(cache, { data: { addTodo } }) {
                const { todos } = cache.readQuery({ query: todosListQuery });
                cache.writeQuery({
                  query: todosListQuery,
                  data: { todos: todos.concat([addTodo]) },
                });
            }
        });
    },
});

const enhancedComponent = compose(
    graphql(createTodo),
    renderWhileLoadingHOC(LoadingPlaceholder),
    withHandlersHOC
)(AddTodo);

export default enhancedComponent;