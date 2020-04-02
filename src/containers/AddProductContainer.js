import {withHandlers, compose} from 'recompose';
import {graphql} from 'react-apollo';

import AddProduct from '../components/AddProduct';
import LoadingPlaceholder from '../components/common/LoadingPlaceholder';
import { productsListQuery, addProduct } from '../shared/graphql';
import { renderWhileLoadingHOC } from '../shared/HOCs';

const withHandlersHOC = withHandlers({
    onSave: props => (title, category) => {
        const {mutate} = props;

        mutate({
            variables: {title, category},
            update(cache, { data: { addProduct } }) {
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
    renderWhileLoadingHOC(LoadingPlaceholder, 'result'),
    withHandlersHOC
)(AddProduct);

export default enhancedComponent;