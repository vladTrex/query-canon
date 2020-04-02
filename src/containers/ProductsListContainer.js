import {compose, withHandlers} from 'recompose';
import {graphql} from 'react-apollo';
import {renderForErrorHOC, renderWhileLoadingHOC} from '../shared/HOCs';

import ProductsList from '../components/ProductsList';
import LoadingPlaceholder from '../components/common/LoadingPlaceholder';
import ErrorPlaceholder from '../components/common/ErrorPlaceholder';
import { productsListQuery, onRemoveProduct } from '../shared/graphql';

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
)(ProductsList);

export default enhancedComponent;