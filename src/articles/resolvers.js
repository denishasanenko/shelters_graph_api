const BlogArticle = require('./models');

const resolvers = {
    Query: {
        blogArticles: async (parent, args) => {
            return await BlogArticle.find({shelter_id: args.shelter_id});
        }
    },
    Mutation: {
        postBlogArticle: async (parent, args) => {
            const article = new BlogArticle({
                user_id: "3e4cccc0-e2fb-11e9-a7aa-dd0f452832bc",
                ...args.input
            });
            return await article.save();
        }
    }
};

module.exports = resolvers;
