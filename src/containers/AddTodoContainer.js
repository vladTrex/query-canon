import {withHandlers, compose, branch, renderComponent} from 'recompose';
import gql from 'graphql-tag';
import {graphql} from 'react-apollo';

import AddTodo from '../components/AddTodo';
import LoadingPlaceholder from '../components/common/LoadingPlaceholder';
import {productsListQuery} from './TodoListContainer';

const addProduct = gql`
    mutation addProduct($title: String!, $category: String!){
        addProduct(title: $title, category: $category){
            _id,
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
            update(cache, { data: { addProduct } }) {
                debugger;
                const { products } = cache.readQuery({ query: productsListQuery });
                cache.writeQuery({
                  query: productsListQuery,
                  data: { products: products.concat([addProduct]) },
                });
            }
        });
    }
});

const enhancedComponent = compose(
    graphql(addProduct),
    renderWhileLoadingHOC(LoadingPlaceholder),
    withHandlersHOC
)(AddTodo);

export default enhancedComponent;