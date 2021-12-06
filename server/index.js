
require('dotenv').config();
const app = require("express")();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const {port, endpoints} = require("./constants");
const authenticate = require("./authentication");

const {
    getBoards, addBoard
} = require("./queries/boards");
const { getPosts, getPostData, createPost, searchQuery, deletePost } = require('./queries/posts');
const { getComments, addComment, replyToComment, deleteComment } = require('./data/comments');


app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// admin authentication
app.post(endpoints.admin, (req, res) => {
    console.log("POST /admin");
    const credentials = req.body;
    authenticate(credentials, res);
});

// front page
// show all the available boards
app.get(endpoints.frontpage, (req, res) => {
    console.log("GET /");
    getBoards()
        .then(result => {
            res.json(result)
        })
        .catch(error => {
            console.log(error);
            res.json({error: "Error while fetching the boards"});
        });
});

// add board
app.post(endpoints.addBoard, (req, res) => {
    console.log("post /board");
    const {id, name, description} = req.body;
    console.log(id, name, description);
    addBoard(id, name, description)
        .then(result => {
            res.json({success: "Board added successfully."});
        })
        .catch(error => {
            console.log(error);
            res.json({error: "Error while adding the board"});
        });
});

// get posts from the given board
app.get(endpoints.board, (req, res) => {
    const board = req.params.board;
    const page = +req.query.page;
    console.log(`GET /${board}?page=${page}`);
    getPosts(board, page)
        .then(result => {
            res.json(result[0].posts);
        })
        .catch(error => {
            console.log(error);
            res.json({error: "Error while fetching the posts"});
        });
});

// get the data from the given post
// the comments are included
app.get(endpoints.postData, (req, res) => {
    const post_id = req.params.post;
    const board_id = req.params.board;
    console.log(`GET /${board_id}/${post_id}`);
    getPostData(board_id, post_id)
        .then(result => {
            res.json(result[0].posts[0]);
        })
        .catch(error => {
            console.log(error);
            res.json({error: "Error while fetching the post"});
        });
});

// get the comments from the given post
// app.get(endpoints.comments, (req, res) => {
//     const {board, post} = req.params;
//     console.log(`GET /comments/${board}/${post}`);
//     getComments(board, post, res);
// });

// create a new post on the board
app.post(endpoints.post, (req, res) => {
    const board = req.params.board;
    const {title, description, date_created, board_name} = req.body;
    console.log(`POST /${board}/post`);
    createPost(title, description, date_created, board)
        .then(result => res.json(result))
        .catch(error => {
            console.log(error);
            res.json(error);
        });
});

// add a comment to the post
app.post(endpoints.comment, (req, res) => {
    const post = req.params.post;
    const {contents, date_added, post_id} = req.body;
    console.log(`POST /comment/${post}`);
    addComment(contents, date_added, post_id, res);
});

// add a reply to the comment
app.post(endpoints.reply, (req, res) => {
    const comment = req.params.comment;
    console.log(`POST /reply/${comment}`);
    const {contents, date_added, post_id, reply_to} = req.body;
    replyToComment(contents, date_added, post_id, reply_to, res);
});

// search the given query in the specified board
app.get(endpoints.search, (req, res) => {
    const {b: board, q: query, page} = req.query;
    console.log(`GET /search?b=${board}&q=${query}&page=${page}`);
    searchQuery(board, query, page)
        .then(result => {
            res.json(result);
        })
        .catch(error => {
            console.log(error);
            res.json({error: "Error while fetching the post"});
        });
});


// delete the specified post
app.delete(endpoints.deletePost, (req, res) => {
    const post = req.params.post;
    console.log(`Delete /post/${post}`);
    deletePost(post, res);
});


// delete the specified comment
app.delete(endpoints.deleteComment, (req, res) => {
    const comment = req.params.comment;
    console.log(`Delete /comment/${comment}`);
    deleteComment(comment, res);
});


// mongodb
mongoose.connect(process.env.DB, {useNewUrlParser: true, useUnifiedTopology: true})
    .then((result) => {
        console.log("Database connection successful");
        app.listen(port, () => {
            console.log(`Server is running on port: ${port}`);
        });
    })
    .catch((err) => console.log("Database connection failed", err));