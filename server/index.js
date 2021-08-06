
require('dotenv').config();
const app = require("express")();
const bodyParser = require("body-parser");

const {endpoints} = require("./constants");
const {
    connection,
    connectToDB,
    getBoards,
    getPosts, 
    getComments, 
    addPost, 
    addComment, 
    addReply
} = require("./database");


const port = process.env.PORT || 5000;


app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// front page
// show all the available boards
app.get(endpoints.frontpage, (req, res) => {
    console.log("GET /");

    const sql = "select board_id from boards;";
    connection.query(sql, (err, result) => {
        if (err) {
            console.log("GET / DB error", err);
            res.json({error: "Couldn't retrieve boards"})
        }
        else res.json(result);
    });
});

// get posts from the given board
app.get(endpoints.board, (req, res) => {
    const board = req.params.board;
    console.log(`GET /${board}`);
    const sql = "select * from posts where board_name = ?";
    connection.query(sql, board, (err, result) => {
        if (err) {
            console.log(`GET /${board} DB error`, err);
            res.json({error: `Couldn't retrieve posts from ${board}`})
        }
        else res.json(result);
    });
    // getPosts(board)
    //     .then(data => res.json(data))
    //     .catch((err) => console.log(`GET /${board} DB error` + err));
});

// get the comments from the given post
app.get(endpoints.comments, (req, res) => {
    const {board, post} = req.params;
    // const post = req.params.post;
    console.log(`GET /${board}/${post}`);
    const sql = "select * from comments where post_id = ?";
    connection.query(sql, post, (err, result) => {
        if (err) {
            console.log(`GET /${board}/${post} DB error`, err);
            res.json({error: `Couldn't retrieve comments from ${board}, post ${post}`})
        }
        else res.json(result);
    });
    // getComments(post)
    //     .then(data => res.json(data))
    //     .catch((err) => console.log(`GET /${board}/${post} DB error` + err));
});

// create a new post on the board
app.post(endpoints.post, (req, res) => {
    const board = req.params.board;
    const {title, description, date_created, board_name} = req.body;
    console.log(`POST /${board}/post`);
    const sql = "insert into posts(title, description, date_created, board_name) values (?, ?, ?, ?)";
    connection.query(sql, [title, description, date_created, board_name], (err, result) => {
        if (err) {
            console.log(`POST /${board}/post DB error`, err);
            res.json({error: `Couldn't add new post to ${board}`})
        }
        else res.json(result);
    });
    // addPost(board)
    //     .then(data => res.json(data))
    //     .catch((err) => console.log(`GET /${board}/post DB error` + err));
});

// add a comment to the post
app.post(endpoints.comment, (req, res) => {
    const post = req.params.post;
    const {contents, date_added, post_id} = req.body;
    console.log(`POST /comment/${post}`);
    const sql = "insert into comments(contents, date_added, post_id) values (?, ?, ?)";
    connection.query(sql, [contents, date_added, post_id], (err, result) => {
        if (err) {
            console.log(`POST /comment/${post} DB error`, err);
            res.json({error: `Couldn't add new comment to ${post} from ${board}`})
        }
        else res.json(result);
    });
    // addComment(post)
    //     .then(data => res.json(data))
    //     .catch((err) => console.log(`GET /comment/${post} DB error` + err));
});

// add a reply to the comment
app.post(endpoints.reply, (req, res) => {
    const comment = req.params.comment;
    console.log(`POST /reply/${comment}`);
    const {contents, date_added, post_id, reply_to} = req.body;
    const sql = "insert into comments(contents, date_added, post_id, reply_to) values (?, ?, ?, ?)";
    connection.query(sql, [contents, date_added, post_id, reply_to], (err, result) => {
        if (err) {
            console.log(`POST /reply/${comment} DB error`, err);
            res.json({error: `Couldn't add new reply to ${post} from ${board}`})
        }
        else res.json(result);
    });
    // addReply(comment)
    //     .then(data => res.json(data))
    //     .catch((err) => console.log(`GET /reply/${comment} DB error` + err));
});

// connect to the database and listen to the requests
connectToDB()
    .then(() => app.listen(port, () => console.log(`Server started on port ${port}`)))
    .catch((err) => console.log("Error connecting to the database"));

// app.listen(port, () => console.log(`Server started on port ${port}`));

// mongoose.connect(process.env.CONNECT, {useNewUrlParser: true, useUnifiedTopology: true})
//     .then(() => app.listen(port, () => console.log(`Server started on port ${port}`)))
//     .catch((err) => console.log("Error connecting to the database"));
