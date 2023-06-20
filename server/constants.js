require('dotenv').config();

// env

const port = process.env.PORT || 5000;


// endpoints

const endpoints = {
    frontpage: "/",
    // board: "/:board/page/:page",
    board: "/board/:board/",
    comments: "/comments/:board/:post",
    post: "/:board/post",
    postData: "/:board/:post",
    comment: "/comment/:board/:post",
    reply: "/reply/:board/:post/:comment",
    search: "/search",
    admin: "/admin",
    addBoard: "/admin/board",
    updateBoard: "/admin/board/:board",
    deleteBoard: "/admin/board/:board",
    deletePost: "/admin/post/:board/:post",
    deleteComment: "/admin/comment/:board/:comment", 
};


module.exports = {
    port,
    endpoints
};