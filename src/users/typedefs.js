const { gql } = require('apollo-server-express');

const typedefs = gql`
    type User {
        id: ID!
        email: String!
        password: String!
    }

    input SignInput {
        email: String!
        password: String!
    }

    extend type Query {
        totalUsers: Int!
        allUsers: [User!]!
    }
    extend type Mutation {
        signIn(input: SignInput): String!
        signUp(input: SignInput): String!
    }
`;

module.exports = typedefs;
