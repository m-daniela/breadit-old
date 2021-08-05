const mongoose = require("mongoose");
const {Schema} = mongoose;

// board schema
// id: String
// name: String
// description: String
// postArray: Array (maybe?)
const boardsSchema = new Schema({
    _id: String,
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
});

const board = mongoose.model("board", boardsSchema);

// post schema
// id: ObjectId
// title: String
// description: String
// date_created: timestamp
// board (FK): ObjectId? (the id of the board)


// comment schema
// id: ObjectId
// text: String
// poster: ObjectId
// date_posted: timestamp
// reply: ObjectId
// post_id: ObjectId

module.exports = board;