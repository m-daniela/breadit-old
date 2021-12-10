
const app = require("express")();
const bodyParser = require("body-parser");

const {port, endpoints} = require("./constants");
const authenticate = require("./authentication");
const {
    connection,
    connectToDB
} = require("./data/connection");
const {
    getBoards
} = require("./data/boards");
const { getPosts, getPostData, createPost, searchQuery, deletePost } = require('./data/posts');
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
    getBoards(res);
});

// get posts from the given board
app.get(endpoints.board, (req, res) => {
    const board = req.params.board;
    // const page = +req.params.page;
    let page = +req.query.page;
    if (isNaN(page) || page < 1){
        page = 1;
    }
    getPosts(board, page, res);
});

// get the data from the given post
app.get(endpoints.postData, (req, res) => {
    const post_id = req.params.post;
    const board_id = req.params.board;
    getPostData(board_id, post_id, res);
});

// get the comments from the given post
app.get(endpoints.comments, (req, res) => {
    const {board, post} = req.params;
    console.log(`GET /comments/${board}/${post}`);
    getComments(board, post, res);
});

// create a new post on the board
app.post(endpoints.post, (req, res) => {
    const board = req.params.board;
    const {title, description, date_created, board_name} = req.body;
    console.log(`POST /${board}/post`);
    createPost(title, description, date_created, board_name, res);
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
    console.log(`GET /search/?b=${board}&q=${query}&page=${page}`);
    searchQuery(board, query, page, res);
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


// connect to the database and listen to the requests
connectToDB()
    .then(() => app.listen(port, () => console.log(`Server started on port ${port}`)))
    .catch((err) => console.log("Error connecting to the database"));
