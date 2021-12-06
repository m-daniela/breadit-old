const { ObjectId } = require("bson");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

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
    posts: [{
        _id: ObjectId, 
        title: {
            type: String, 
            required: true
        }, 
        description: String, 
        date_created: { 
            type: Date, 
            default: Date.now 
        },
        comments: [{
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
        }]
    }]
});

const Board = mongoose.model("board", boardSchema);

module.exports = Board;