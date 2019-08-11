export const typeDefs = `
    type Todo {
        id: ID!
        title: String
        category: String
    }

    type Query {
        todos: [Todo]
    }
`;