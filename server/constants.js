
// endpoints

const endpoints = {
    frontpage: "/",
    admin: "/admin",
    board: "/:board/page/:page",
    comments: "/comments/:board/:post",
    post: "/:board/post",
    postData: "/post/:board/:post",
    comment: "/comment/:post",
    reply: "/reply/:comment",
    search: "/search/"
};


module.exports = {
    endpoints
};