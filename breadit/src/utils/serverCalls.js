import axios from "axios";
import { addCommentUrl, addPostUrl, addReplyUrl, boardUrl, mainUrl, commentsUrl, postUrl, searchUrl } from "./constants";

// get boards
export const getBoards = () =>{
    return axios.get(mainUrl)
        .then(res => res.data)
        .catch(err => console.log(err));
};

// get post data 
export const getPost = (post_id, board_id) => {
    return axios.get(postUrl(board_id, post_id))
        .then(res => res.data)
        .catch(err => console.log(err));
};

// get posts from the given board
export const getPosts = (board, page) => {
    return axios.get(boardUrl(board, page))
        .then(res => res.data)
        .catch(err => console.log(err));
};

// get the comments from the post
export const getComments = (board, post) => {
    return axios.get(commentsUrl(board, post))
        .then(res => res.data)
        .catch(err => console.log(err));
};

// add a new post
export const addPost = (board_name, title, date_created, description) => {
    return axios.post(addPostUrl(board_name), {title, description, date_created, board_name})
        .then(res => res.data)
        .catch(err => console.log(err));
        
};

// add a new comment to the given post
export const addComment = (post_id, contents, date_added) => {
    return axios.post(addCommentUrl(post_id), {post_id, contents, date_added})
        .then(res => res.data)
        .catch(err => console.log(err));
};

// add reply to the given comment
export const addReply = (post_id, contents, date_added, reply_to) => {
    return axios.post(addReplyUrl(post_id), {post_id, contents, date_added, reply_to})
        .then(res => res.data)
        .catch(err => console.log(err));
};

// search board
export const getSearchResults = (board, query, page) => {
    return axios.get(searchUrl(board, query, page))
        .then(res => {
            console.log(res.data);
            return res.data;
        })
        .catch(err => console.log(err));
};