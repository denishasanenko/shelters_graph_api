const { gql } = require('apollo-server-express');

const typedefs = gql`
    type BlogArticle {
        id: ID!
        title: String!
        article: String!
    }

    input BlogArticleInput {
        shelter_id: ID!
        title: String!
        article: String!
    }

    extend type Query {
        blogArticles(shelter_id: ID!): [BlogArticle!]!
    }
    extend type Mutation {
        postBlogArticle(input: BlogArticleInput!): BlogArticle!
    }
`;

module.exports = typedefs;
