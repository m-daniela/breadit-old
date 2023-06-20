const Board = require("../model/Board");
const mongoose = require("mongoose");

/**
 * get posts from the board, starting from 
 * the given page
 * @param {string} board 
 * @param {number} page 
 */
const getPosts = async (board, page) => {
    const startIndex = (page - 1) * 10;
    const endIndex = startIndex + 10;
    console.log(startIndex)
    return await Board.findById(board, {
        posts: {
            $slice: [startIndex, endIndex],    
        }, 
        _id: 0, 
        name: 0, 
        description: 0
    });
    // return await Board.findById(board)
    //     .populate({
    //         path: "posts", 
    //         select: {
    //             "name": 0,
    //             "posts.title": 0
    //         }})
    //     .select({posts: {$slice: [startIndex, endIndex] }});
};

/**
 * get post data (title, description, date created, 
 * post_id, board_name), along with the comments
 * @param {string} board 
 * @param {number} post 
 */
const getPostData = async (board, post) => {
    return await Board.findOne({_id: board}, {
        posts: {
            $elemMatch: {
                _id: post
            }
        }
    });

}

/**
 * create a post on the given board
 * @param {string} title 
 * @param {string} description 
 * @param {timestamp} date_created 
 * @param {string} board_name 
 */
 const createPost = async (title, description, date_created, board_name) => {
    const _id = mongoose.Types.ObjectId();
    try{
        const result = await Board.updateOne({_id: board_name}, {
            $push: {
                posts: {
                    _id,
                    title, 
                    description, 
                    date_created
                }
            }
        });
        if (result.nModified !== 0){
            return {
                _id, 
                success: `Added post with title "${title}".`
            }
        }
        else{
            return {
                error: `Error while adding the post with title "${title}".`
            }
        }
    }
    catch(error){
        console.log(error);
        return {
            error: `Error while adding the post with title "${title}".`
        }
    }

 }

 /**
 * search among the posts in the given board or,
 * if none is given, search through all the posts
 * @param {string} board 
 * @param {string} query 
 * @param {page} page 
 */
const searchQuery = async (board, query, page) => {
    const startIndex = (page - 1) * 10;
    const endIndex = startIndex + 10;
    console.log(query)
    return await Board.find({
        $or: [
            // {"posts.title": {$regex: query, $options: "i"}}, 
            {"posts.title": /7/}, 
            {"posts.description": /7/}
            // {"posts.description": {$regex: query, $options: "i"}}
        ],
            // posts: {
            //     $slice: [startIndex, endIndex], 
            // }
        }).select({posts: 1});
}


/**
 * delete the post with the given id
 * @param {number} post 
 */
const deletePost = async (board, post) => {
    try{
        const result = await Board.updateOne({_id: board}, {
            $pull: {
                posts: {
                    _id: post
                }
            }
        });
        if (result.nModified !== 0){
            return {
                _id, 
                success: `Deleted post with title "${post}".`
            }
        }
        else{
            return {
                error: `Error while deleting the post with title "${post}".`
            }
        }
    }
    catch(error){
        console.log(error);
        return {
            error: `Error while deleting the post with title "${post}".`
        }
    }
};

 module.exports = {
    getPosts,
    getPostData,
    createPost,
    searchQuery,
    deletePost
};