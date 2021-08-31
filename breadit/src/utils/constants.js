
export const routes = {
    main: "/",
    board: "/:board/page/:page",
    post: "/:board/post/:post", 
    search: "/search/"
};


export const port = 5000;
export const mainUrl = `http://localhost:${port}/`;
export const boardUrl = (board, page) => `${mainUrl}${board}/page/${page}`;
export const commentsUrl = (board, post) => `${mainUrl}comments/${board}/${post}`;
export const postUrl = (board, post) => `${mainUrl}post/${board}/${post}`;
export const addPostUrl = board => `${mainUrl}${board}/post`;
export const addCommentUrl = post => `${mainUrl}comment/${post}`;
export const addReplyUrl = comment => `${mainUrl}reply/${comment}`;
// export const searchUrl = (board, query) => `${mainUrl}search/${board}`;
export const searchUrl = (board, query, page=1) => `${mainUrl}search/?b=${board}&q=${query}&page=${page}`;

export const customBoard = (board, page=1) => page >= 1 ? `/${board}/page/${page}` : `/${board}/page/1`;
export const customPost = (board, post) => `/${board}/post/${post}`;
export const customSearch = (board, query, page=1) => `?b=${board}&q=${query}&page=${page}`;
