const mysql = require("mysql");


// connect to the database
const connection = mysql.createConnection({
    host: process.env.HOST,
    port: process.env.DB_PORT,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});


const connectToDB = async () => {
    connection.connect((err) => {
        if (err) throw(err);
        else console.log("DB connection successful");
    })
}


// get all the boards from the db
const getBoards = async () => {

}

// get all posts from the board
const getPosts = async (board) => {

}

// get all the comments from the given post
const getComments = async (post) => {

}

// add a new post on the board
const addPost = async (board) => {

}

// add a comment to the given post
const addComment = async (post) => {

}

// reply to an existing comment
const addReply = async (board, post, comment) => {

}

module.exports = {
    connection,
    connectToDB,
    getBoards,
    getPosts, 
    getComments, 
    addPost, 
    addComment, 
    addReply
}