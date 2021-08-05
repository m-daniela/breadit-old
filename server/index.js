
require('dotenv').config();
const app = require("express")();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const {endpoints} = require("./constants");
const boards = require("./schemas");


const port = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// front page
app.get(endpoints.frontpage, (req, res) => {
    console.log("GET /");
    // const board = new boards({
    //     "_id":"b",
    //     "description":"This is a board about bread. Talk about bread, share pictures of your newest oven wonder etc.",
    //     "name":"bread"
    // })

    // board.save();
    boards.find()
        .then((data) => res.json(data))
        .catch((err) => console.log("GET / error on db " + err));
    // res.send("It works");
});

// get posts from the given board
app.get(endpoints.board, (req, res) => {
    const board = req.params.board;
    console.log(`GET /${board}`);
});

// get the comments from the given post
app.get(endpoints.comments, (req, res) => {
    console.log("GET /board/post_id");
});

// create a new post on the board
app.post(endpoints.post, (req, res) => {
    console.log("POST /board/post");
});

// add a comment to the post
app.post(endpoints.comment, (req, res) => {
    console.log("POST /board/comment/post_id");
});

// add a reply to the comment
app.post(endpoints.reply, (req, res) => {
    console.log("POST /board/comment/post_id/comment_id");
    res.send("It works");
});

// connect to the database and listen to the requests
mongoose.connect(process.env.CONNECT, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => app.listen(port, () => console.log(`Server started on port ${port}`)))
    .catch((err) => console.log("Error connecting to the database"));
