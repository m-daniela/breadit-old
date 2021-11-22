
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
const authenticate = require("./admin");


const port = process.env.PORT || 5000;


app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// admin authentication
app.post(endpoints.admin, (req, res) => {
    console.log("POST /admin");
    const credentials = req.body;
    try{
        const success = authenticate(credentials);
        if (success){
            res.json({
                success: "Authentication successful"
            });
        }
        else{
            res.json({
                error: "Incorrect email or password"
            });
        }
    }
    catch(err){
        console.log(err);
        res.json({
            error: "Something went wrong"
        })
    }
    

});

// front page
// show all the available boards
app.get(endpoints.frontpage, (req, res) => {
    console.log("GET /");

    const sql = "select * from boards;";
    connection.query(sql, (err, result) => {
        if (err) {
            console.log("GET / DB error", err);
            res.json({error: "Couldn't retrieve boards"})
        }
        else {
            console.log(res.json);

            res.json(result);
        }
    });
});

// get posts from the given board
app.get(endpoints.board, (req, res) => {
    const board = req.params.board;
    const page = +req.params.page;
    const startIndex = (page - 1) * 10;
    const endIndex = startIndex + 10;

    console.log(`GET /${board}/page/${page}`);
    const sql = "select * from posts where board_name = ? order by date_created desc limit ?, ?";
    connection.query(sql, [board, startIndex, endIndex], (err, result) => {
        if (err) {
            console.log(`GET /${board} DB error`, err);
            res.json({error: `Couldn't retrieve posts from ${board}`})
        }
        else res.json(result);
    });
});

// get the data from the given post
app.get(endpoints.postData, (req, res) => {
    const post_id = req.params.post;
    const board_id = req.params.board;
    console.log(`GET /post/${board_id}/${post_id}`);
    const sql = "select * from posts p where p.post_id = ? and p.board_name = ?";
    connection.query(sql, [post_id, board_id], (err, result) => {
        if (err) {
            console.log(`GET /${post_id} DB error`, err);
            res.json({error: `Couldn't retrieve posts from ${post_id}`})
        }
        else {
            res.json(result[0]);
        }
    });
});

// get the comments from the given post
app.get(endpoints.comments, (req, res) => {
    const {board, post} = req.params;
    console.log(`GET /comments/${board}/${post}`);
    const sql = "select * from comments where post_id = ? order by date_added desc";
    connection.query(sql, post, (err, result) => {
        if (err) {
            console.log(`GET /${board}/${post} DB error`, err);
            res.json({error: `Couldn't retrieve comments from ${board}, post ${post}`})
        }
        else {
            res.json(result);
        }
    });
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
});

// search the given query in the specified board
app.get(endpoints.search, (req, res) => {
    const {b: board, q: query, page} = req.query;
    console.log(`GET /search/?b=${board}&q=${query}&page=${page}`);
    const searchQuery = `%${query}%`;
    const startIndex = (+page - 1) * 10;
    const endIndex = startIndex + 10;

    if (board){
        const sql = "select * from posts where (title like ? or description like ?) and board_name = ? order by date_created desc limit ?, ?";
        connection.query(sql, [searchQuery, searchQuery, board, startIndex, endIndex], (err, result) => {
            if (err) {
                console.log(`GET /search/?b=${board}&q=${query} error`, err);
                res.json([])
            }
            else res.json(result);
        });
    }
    else{
        const sql = "select * from posts where title like ? or description like ? order by date_created desc limit ?, ?";
        connection.query(sql, [searchQuery, searchQuery, startIndex, endIndex], (err, result) => {
            if (err) {
                console.log(`GET /search/?b=${board}&q=${query} error`, err);
                res.json([])
            }
            else res.json(result);
        });
    }
});


// delete the specified post
app.delete(endpoints.deletePost, (req, res) => {
    const post = req.params.post;
    console.log(`Delete /post/${post}`);
    console.log(req.params);
    const sql = "delete from posts where post_id = ?";
    connection.query(sql, [post], (err, result) => {
        if (err) {
            console.log(`Delete /post/${post} error`, err);
            res.json({
                error: "Something went wrong while deleting"
            })
        }
        else res.json({
            success: "Post was deleted"
        });
    });
    
});


// delete the specified comment
app.delete(endpoints.deleteComment, (req, res) => {
    const comment_id = req.params.comment;
    console.log(`Delete /comment/${comment_id}`);
    console.log(req.params);
    const sql = "delete from comments where comment_id = ?";
    connection.query(sql, [comment_id], (err, result) => {
        if (err) {
            console.log(`Delete /comment/${comment_id} error`, err);
            res.json({
                error: "Something went wrong while deleting"
            })
        }
        else res.json({
            success: "Comment was deleted"
        });
    });
    
});


// connect to the database and listen to the requests
connectToDB()
    .then(() => app.listen(port, () => console.log(`Server started on port ${port}`)))
    .catch((err) => console.log("Error connecting to the database"));
