
// endpoints

const endpoints = {
    frontpage: "/",
    board: "/:board",
    comments: "/:board/:post",
    post: "/:board/post",
    comment: "/:board/comment/:post",
    reply: "/:board/comment/:post/:comment"
};



module.exports = {
    endpoints
};