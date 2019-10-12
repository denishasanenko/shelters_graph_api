const Shelter = require('./models');
const BlogArticle = require('../articles/models');
const User = require('../users/models');

const resolvers = {
    Query: {
        totalShelters: async () => {
            return await Shelter.count();
        },
        allShelters: async () => {
            return await Shelter.find();
        }
    },
    Mutation: {
        postShelter: async (parent, args) => {
            const newShelter = new Shelter({
                user_id: "3e4cccc0-e2fb-11e9-a7aa-dd0f452832bc",
                ...args.input
            });
            return await newShelter.save();
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
};

module.exports = resolvers;
