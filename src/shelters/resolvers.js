const { Shelter, Pet } = require('./models');
const BlogArticle = require('../articles/models');
const User = require('../users/models');

const resolvers = {
    Query: {
        totalShelters: async () => {
            return await Shelter.count();
        },
        allShelters: async () => {
            return await Shelter.find();
        },
        pets: async () => {
            return await Pet.find();
        },
        pet: async (parent, args) => {
            return await Pet.findOne({name: args.id});
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
        postPet: async (parent, args) => {
            const shelter = await Shelter.findOne({id: args.input.shelter_id});
            if (!shelter) {
                throw Error('Shelter did not found');
            }
            const newPet = new Pet({
                user_id: "3e4cccc0-e2fb-11e9-a7aa-dd0f452832bc",
                ...args.input
            });
            return await newPet.save();
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
    Pet: {
        shelter: async (parent, args, context) => {
            return await Shelter.findOne({id: parent.shelter_id});
        },
        picture: (parent) => {
            return parent.picture ? parent.picture : 'assets/banner.png';
        }
    }
};

module.exports = resolvers;
