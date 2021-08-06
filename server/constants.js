
// endpoints

const endpoints = {
    frontpage: "/",
    board: "/:board",
    comments: "/:board/:post",
    post: "/:board/post",
    comment: "/comment/:post",
    reply: "/reply/:comment"
};


module.exports = {
    endpoints
};