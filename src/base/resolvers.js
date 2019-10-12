const { GraphQLScalarType } =  require('graphql');

const resolvers = {
    Query: {
        smoke: async (parent, args) => {
            return '';
        }
    },
    Mutation: {
        smoke: (parent, args) => {
            return '';
        }
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
