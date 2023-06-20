const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const {postSchema} = require("./Post");

const boardSchema = new Schema({
    _id: String, 
    name: {
        type: String, 
        required: true, 
        unique: true
    },
    description: {
        type: String, 
        required: true
    }, 
    posts: [postSchema]
});

const Board = mongoose.model("board", boardSchema);

module.exports = Board;