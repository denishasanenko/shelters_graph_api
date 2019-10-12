const { gql } = require('apollo-server-express');

const typedefs = gql`
    enum ShelterCategory {
        CATS
        DOGS
        BOTH
    }
    type Shelter {
        id: ID!
        name: String!
        description: String
        category: ShelterCategory!
        created_at: DateTime
        posted_by: User!
        blog_articles: [BlogArticle!]
    }

    input PostShelterInput {
        name: String!
        description: String
        category: ShelterCategory=DOGS
    }

    extend type Query {
        totalShelters: Int!
        allShelters: [Shelter!]!
    }
    extend type Mutation {
        postShelter(input: PostShelterInput!): Shelter!
    }
`;

module.exports = typedefs;
