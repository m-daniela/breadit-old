
// endpoints

const endpoints = {
    frontpage: "/",
    board: "/:board",
    comments: "/comments/:board/:post",
    post: "/:board/post",
    postData: "/post/:board/:post",
    comment: "/comment/:post",
    reply: "/reply/:comment"
};


module.exports = {
    endpoints
};