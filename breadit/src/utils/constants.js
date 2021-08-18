
export const routes = {
    main: "/",
    board: "/:board",
    post: "/:board/:post", 
};

const endpoints = {
    frontpage: "/",
    board: "/:board",
    comments: "/:board/:post",
    post: "/:board/post",
    comment: "/comment/:post",
    reply: "/reply/:comment"
};

export const port = 5000;
export const mainUrl = `http://localhost:${port}/`;
export const boardUrl = board => `${mainUrl}${board}`;
export const commentsUrl = (board, post) => `${mainUrl}comments/${board}/${post}`;
export const postUrl = (board, post) => `${mainUrl}post/${board}/${post}`;
export const addPostUrl = board => `${mainUrl}${board}/post`;
export const addCommentUrl = post => `${mainUrl}comment/${post}`;
export const addReplyUrl = comment => `${mainUrl}reply/${comment}`;


export const customBoard = board => `/${board}`;
export const customPost = (board, post) => `/${board}/${post}`;