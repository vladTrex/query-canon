import {compose, branch, renderComponent} from 'recompose';
import gql from 'graphql-tag';
import {graphql} from 'react-apollo';

import TodoList from '../components/TodoList';
import LoadingPlaceholder from '../components/common/LoadingPlaceholder';

export const todosListQuery = gql`
    query TodosListQuery {
        todos {
            id
            title
            category
        }
    }
`;

const renderWhileLoadingHOC = (component, propName = 'data') =>
  branch(
    props => props[propName].loading,
    renderComponent(component),
  );

const enhancedComponent = compose(
    graphql(todosListQuery),
    renderWhileLoadingHOC(LoadingPlaceholder),
)(TodoList);

export default enhancedComponent;