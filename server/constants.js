require('dotenv').config();

// env

const port = process.env.PORT || 5000;


// endpoints

const endpoints = {
    frontpage: "/",
    board: "/:board/page/:page",
    comments: "/comments/:board/:post",
    post: "/:board/post",
    postData: "/post/:board/:post",
    comment: "/comment/:post",
    reply: "/reply/:comment",
    search: "/search/",
    admin: "/admin",
    addBoard: "/admin/board",
    updateBoard: "/admin/board/:board",
    deleteBoard: "/admin/board/:board",
    deletePost: "/admin/post/:post",
    deleteComment: "/admin/comment/:comment"
};


module.exports = {
    port,
    endpoints
};