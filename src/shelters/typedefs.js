const { gql } = require('apollo-server-express');

const typedefs = gql`
    enum ShelterCategory {
        CATS
        DOGS
        BOTH
    }
    enum PetGender {
        unknown
        male
        female
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
        gender: PetGender
        age: Int
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
        gender: PetGender
        age: Int
    }

    extend type Query {
        totalShelters: Int!
        allShelters: [Shelter!]!
        pets: [Pet!]!
        pet(id: String): Pet!
    }
    extend type Mutation {
        postShelter(input: PostShelterInput!): Shelter!
        postPet(input: PostPetInput!): Pet!
    }
`;

module.exports = typedefs;
