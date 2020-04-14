import gql from "graphql-tag";

// queries
export const me = gql`
    query me {
        me {
            _id
            name
            bio
        }
    }
`;

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
    mutation addProduct($input: ProductInput){
        addProduct(input: $input){
            _id,
            title,
            category
        }
    }
`;

export const updateMe = gql`
    mutation updateMe($bio: String!){
        updateMe(bio: $bio){
            _id
            name
            bio
        }
    }
`;