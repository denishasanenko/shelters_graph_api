const { GraphQLScalarType } =  require('graphql');
const uuidv1 = require('uuid/v1');

let identifier = 0;
const shelters = [];

const resolvers = {
    Query: {
        totalShelters: (parent, args, { db }) => {
            return db.collection('shelters').estimatedDocumentCount();
        },
        allShelters: (parent, args, { db }) => {
            return db.collection('shelters').find().toArray();
        }
    },
    Mutation: {
        postShelter: (parent, args, { db }) => {
            const newShelter = {
                created_at: new Date(),
                ...args.input
            };
            if (!newShelter.id) {
                newShelter.id = uuidv1();
            }
            console.log(newShelter);
            shelters.push(newShelter);
            db.collection('shelters').replaceOne({id: newShelter.id}, newShelter, {upsert: true});
            return newShelter;
        }
    },
    Shelter: {
        trivial: () => true
    },
    DateTime: new GraphQLScalarType({
        name: 'DateTime',
        description: 'Valid timestamp',
        parseValue: (value) => new Date(value),
        serialize: (value) => new Date(value).toISOString(),
        parseLiteral: (ast) => ast.value
    })
};

module.exports = resolvers;
