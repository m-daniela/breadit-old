const {connection} = require("./connection");


/**
 * get boards
 * @param {string} board 
 * @param {number} page 
 * @param {*} res 
 */
const getPosts = (board, page, res) => {
    const startIndex = (page - 1) * 10;
    const endIndex = startIndex + 10;

    

    console.log(`GET /${board}?page=${page}`);
    const sql = "select * from posts where board_name = ? order by date_created desc limit ?, ?";
    connection.query(sql, [board, startIndex, endIndex], (err, result) => {
        if (err) {
            console.log(`GET /${board} DB error`, err);
            res.json({error: `Couldn't retrieve posts from ${board}`})
        }
        else res.json(result);
    });
}

/**
 * get post data (title, description, date created, post_id, board_name)
 * @param {string} board 
 * @param {number} post 
 * @param {*} res 
 */
const getPostData = (board, post, res) => {
    console.log(`GET /post/${board}/${post}`);
    const sql = "select * from posts p where p.post_id = ? and p.board_name = ?";
    connection.query(sql, [post, board], (err, result) => {
        if (err) {
            console.log(`GET /${post} DB error`, err);
            res.json({error: `Couldn't retrieve posts from ${post}`})
        }
        else {
            res.json(result[0]);
        }
    });
}

/**
 * create a post on the given board
 * @param {string} title 
 * @param {string} description 
 * @param {timestamp} date_created 
 * @param {string} board_name 
 * @param {*} res 
 */
const createPost = (title, description, date_created, board_name, res) => {
    const sql = "insert into posts(title, description, date_created, board_name) values (?, ?, ?, ?)";
    connection.query(sql, [title, description, date_created, board_name], (err, result) => {
        if (err) {
            console.log(`POST /${board}/post DB error`, err);
            res.json({error: `Couldn't add new post to ${board}`})
        }
        else res.json(result);
    });
}

/**
 * search among the posts in the given board or,
 * if none is given, search through all the posts
 * @param {string} board 
 * @param {string} query 
 * @param {page} page 
 * @param {*} res 
 */
const searchQuery = (board, query, page, res) => {
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
}

/**
 * delete the post with the given id
 * @param {number} post 
 * @param {*} res 
 */
const deletePost = (post, res) => {
    const sql = "delete from posts where post_id = ?";
    connection.query(sql, [post], (err, result) => {
        if (err) {
            console.log(`Delete /post/${post} error`, err);
            res.json({
                error: "Something went wrong while deleting"
            })
        }
        else {
            if (result.affectedRows > 0){
                res.json({
                    success: `Post ${post} was deleted`
                });
            }
            else{
                res.json({
                    error: `Post ${post} could not be deleted`
                });
            }
        }
    });
}

module.exports = {
    getPosts,
    getPostData,
    createPost,
    searchQuery,
    deletePost
};