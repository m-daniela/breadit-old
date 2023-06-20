const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const {commentSchema} = require("./Comment");

const postSchema = new Schema({
    title: {
        type: String, 
        required: true
    }, 
    description: String, 
    date_created: { 
        type: Date, 
        default: Date.now 
    },
    comments: [commentSchema]
});

const Post = mongoose.model("post", postSchema);

module.exports = {
    Post, 
    postSchema
};