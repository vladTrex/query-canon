import gql from "graphql-tag";

// queries
export const productsListQuery = gql`
    query ProductsListQuery {
        products {
            _id
            title
            category
        }
    }
`;

// mutations
export const onRemoveProduct = gql`
    mutation removeProduct($productId: String!) {
        removeProduct(productId: $productId) {
            success
        }
    }
`;

export const addProduct = gql`
    mutation addProduct($title: String!, $category: String!){
        addProduct(title: $title, category: $category){
            _id,
            title,
            category
        }
    }
`;