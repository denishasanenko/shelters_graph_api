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
    type Pet {
        id: ID!
        name: String!
        shelter: Shelter
        picture: String!
    }

    input PostShelterInput {
        name: String!
        description: String
        category: ShelterCategory=DOGS
    }

    input PostPetInput {
        name: String!
        shelter_id: ID!
        picture: String
    }

    extend type Query {
        totalShelters: Int!
        allShelters: [Shelter!]!
        pets: [Pet!]!
    }
    extend type Mutation {
        postShelter(input: PostShelterInput!): Shelter!
        postPet(input: PostPetInput!): Pet!
    }
`;

module.exports = typedefs;
