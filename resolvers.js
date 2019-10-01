const { GraphQLScalarType } =  require('graphql');
const uuidv1 = require('uuid/v1');
const { BlogArticle, User } = require('./models');

const resolvers = {
    Query: {
        totalUsers: async (parent, args, { db }) => {
            return await User.count();
        },
        allUsers: async (parent, args, { db }) => {
            return await User.find();
        },
        totalShelters: (parent, args, { db }) => {
            return db.collection('shelters').estimatedDocumentCount();
        },
        allShelters: (parent, args, { db }) => {
            return db.collection('shelters').find().toArray();
        },
        blogArticles: async (parent, args, { db }) => {
            return await BlogArticle.find({shelter_id: args.shelter_id});
        }
    },
    Mutation: {
        postShelter: (parent, args, { db }) => {
            const newShelter = {
                created_at: new Date(),
                user_id: "3e4cccc0-e2fb-11e9-a7aa-dd0f452832bc",
                ...args.input
            };
            if (!newShelter.id) {
                newShelter.id = uuidv1();
            }
            db.collection('shelters').replaceOne({id: newShelter.id}, newShelter, {upsert: true});
            return newShelter;
        },
        signIn: async (parent, args, { db }) => {
            const user = await User.findOne({email: args.input.email});
            if (!user || !user.comparePassword(args.input.password)) {
                throw new Error('Email or Password is incorrect');
            }
            return '123';
        },
        signUp: async (parent, args, { db }) => {
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
        posted_by: async (parent, args, { db }) => {
            return await User.findOne({id: parent.user_id});
        },
        blog_articles: async (parent, args, { db }) => {
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
