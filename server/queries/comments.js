const Board = require("../model/Board");
const {Comment} = require("../model/Comment");
const mongoose = require("mongoose");
const {ObjectId} = require("bson");

/**
 * add a comment to the post
 * @param {string} contents 
 * @param {timestamp} date_added 
 * @param {number} post_id 
 */
 const addComment = async (board, contents, date_added, post) => {

    try{
        const result = await Board.updateOne({
            _id: board, 
            posts: {
                $elemMatch: {
                    _id: post
                }
            }
        }, {
            $push: {
                "posts.$.comments": {
                    contents, 
                    date_added
                }
            }
        });
        console.log(result)
        if (result.nModified !== 0){
            return {
                _id, 
                success: `Added comment.`
            }
        }
        else{
            return {
                error: `Error while adding the comment.`
            }
        }
    }
    catch(error){
        console.log(error);
        return {
            error: `Error while adding the comment`
        }
    }
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
    addComment,
    replyToComment,
    deleteComment
};