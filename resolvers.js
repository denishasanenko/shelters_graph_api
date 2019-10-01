const { GraphQLScalarType } =  require('graphql');
const { BlogArticle, User, Shelter } = require('./models');

const resolvers = {
    Query: {
        totalUsers: async () => {
            return await User.count();
        },
        allUsers: async () => {
            return await User.find();
        },
        totalShelters: async () => {
            return await Shelter.count();
        },
        allShelters: async () => {
            return await Shelter.find();
        },
        blogArticles: async (parent, args) => {
            return await BlogArticle.find({shelter_id: args.shelter_id});
        }
    },
    Mutation: {
        postShelter: async (parent, args) => {
            const newShelter = new Shelter({
                user_id: "3e4cccc0-e2fb-11e9-a7aa-dd0f452832bc",
                ...args.input
            });
            return await newShelter.save();
        },
        signIn: async (parent, args) => {
            const user = await User.findOne({email: args.input.email});
            if (!user || !user.comparePassword(args.input.password)) {
                throw new Error('Email or Password is incorrect');
            }
            return '123';
        },
        signUp: async (parent, args) => {
            const user = await User.findOne({email: args.input.email});
            if (user) {
                throw new Error('Email already registered');
            }
            const newUser = new User({
                ...args.input
            });
            await newUser.save();
            return '123';
        },
        postBlogArticle: async (parent, args) => {
            const article = new BlogArticle({
                user_id: "3e4cccc0-e2fb-11e9-a7aa-dd0f452832bc",
                ...args.input
            });
            return await article.save();
        }
    },
    Shelter: {
        posted_by: async (parent) => {
            return await User.findOne({id: parent.user_id});
        },
        blog_articles: async (parent) => {
            return await BlogArticle.find({shelter_id: parent.id});
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
