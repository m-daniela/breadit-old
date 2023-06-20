const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const {ObjectId} = require("bson");

const commentSchema = new Schema({
    _id: ObjectId, 
    contents: {
        type: String, 
        required: true
    }, 
    date_added: { 
        type: Date, 
        default: Date.now 
    },
    reply_to: {
        type: ObjectId, 
        default: null
    }
});

const Comment = mongoose.model("comment", commentSchema);

module.exports = {
    Comment,
    commentSchema
};