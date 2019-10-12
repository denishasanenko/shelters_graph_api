const { gql } = require('apollo-server-express');

const typedefs = gql`
    scalar DateTime
    type Query {
        smoke: String
    }
    type Mutation {
        smoke(input: String): String
    }
`;

module.exports = typedefs;
