const mongoose = require('../db');
const { Schema } = require('mongoose');
const uuidv1 = require('uuid/v1');

const BlogArticleScheme = new Schema(
    {
        id: String,
        user_id: String,
        shelter_id: String,
        title: String,
        article: String
    }
);
BlogArticleScheme.pre('save', function (next) {
    if (!this.id) {
        this.id = uuidv1();
    }
    next();
});
const BlogArticle = mongoose.model('BlogArticle', BlogArticleScheme);

module.exports = BlogArticle;
