
export const routes = {
    main: "/",
    board: "/:board",
    post: "/:board/:post", 
};

export const customBoard = board => `/${board}`;
export const customPost = (board, post) => `/${board}/${post}`;