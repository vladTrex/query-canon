import {compose, branch, renderComponent, withHandlers} from 'recompose';
import gql from 'graphql-tag';
import {graphql} from 'react-apollo';

import TodoList from '../components/TodoList';
import LoadingPlaceholder from '../components/common/LoadingPlaceholder';
import ErrorPlaceholder from '../components/common/ErrorPlaceholder';

export const productsListQuery = gql`
    query ProductsListQuery {
        products {
            _id
            title
            category
        }
    }
`;

export const onRemoveProduct = gql`
    mutation removeProduct($productId: String!) {
        removeProduct(productId: $productId) {
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
    onRemove: props => productId => {
        const { removeProductMutation } = props;

        removeProductMutation({
            variables: {
                productId
            },
            update(cache) {
                const cachedData = cache.readQuery({
                    query: productsListQuery
                });

                const {products} = cachedData;

                const updatedData = products
                    .filter(product => product._id !== productId);

                cache.writeQuery({
                    query: productsListQuery,
                    data: {
                        products: updatedData
                    }
                });
            }
        });
    }
});

const enhancedComponent = compose(
    graphql(productsListQuery),
    graphql(onRemoveProduct, {
        name: 'removeProductMutation'
    }),
    renderForErrorHOC(ErrorPlaceholder),
    renderWhileLoadingHOC(LoadingPlaceholder),
    withHandlersHOC
)(TodoList);

export default enhancedComponent;