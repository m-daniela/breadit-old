const {connection} = require("./connection");

/**
 * get the comments from the given board and post id
 * @param {string} board 
 * @param {number} post 
 * @param {*} res 
 */
const getComments = (board, post, res) => {
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
};

/**
 * add a comment to the post
 * @param {string} contents 
 * @param {timestamp} date_added 
 * @param {number} post_id 
 * @param {*} res 
 */
const addComment = (contents, date_added, post_id, res) => {
    const sql = "insert into comments(contents, date_added, post_id) values (?, ?, ?)";
    connection.query(sql, [contents, date_added, post_id], (err, result) => {
        if (err) {
            console.log(`POST /comment/${post} DB error`, err);
            res.json({error: `Couldn't add new comment to ${post} from ${board}`})
        }
        else res.json(result);
    });
}

/**
 * reply to comment on the given post
 * @param {string} contents 
 * @param {timestamp} date_added 
 * @param {number} post_id 
 * @param {number} reply_to 
 * @param {*} res 
 */
const replyToComment = (contents, date_added, post_id, reply_to, res) => {
    const sql = "insert into comments(contents, date_added, post_id, reply_to) values (?, ?, ?, ?)";
    connection.query(sql, [contents, date_added, post_id, reply_to], (err, result) => {
        if (err) {
            console.log(`POST /reply/${comment} DB error`, err);
            res.json({error: `Couldn't add new reply to ${post} from ${board}`})
        }
        else res.json(result);
    });
}


/**
 * delete comment with given id 
 * @param {number} comment 
 * @param {*} res 
 */
const deleteComment = (comment, res) =>{
    const sql = "delete from comments where comment_id = ?";
    connection.query(sql, [comment], (err, result) => {
        if (err) {
            console.log(`Delete /comment/${comment} error`, err);
            res.json({
                error: "Something went wrong while deleting"
            })
        }
        else{
            if (result.affectedRows > 0){
                res.json({
                    success: `Comment ${comment} was deleted`
                });
            }
            else{
                res.json({
                    error: `Comment ${comment} could not be deleted`
                });
            }
        } 
    });
}

module.exports = {
    getComments,
    addComment,
    replyToComment,
    deleteComment
};