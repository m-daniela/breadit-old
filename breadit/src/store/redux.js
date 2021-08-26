import { configureStore, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getComments, getPosts } from '../utils/serverCalls';

const initialBoard = {};
const initialPage = 1;
const initialPosts = [];
const initialComments = [];

// middleware

// fetch the posts for the selected board
export const fetchPosts = createAsyncThunk(
    "posts/fetchPosts", 
    async ({board, page}, thunkAPI) => {
        console.log(board, page, "====");
        const posts = await getPosts(board, page);
        return posts;
    }
);

// fetch the comments for a selected post
export const fetchComments = createAsyncThunk(
    "posts/fetchComments", 
    async ({ board, post }, thunkAPI) => {
        const posts = await getComments(board, post);
        return posts;
    }
);

// change the selected board
const boardSlice = createSlice({
    name: "board",
    initialState: initialBoard,
    reducers: {
        selectBoard: (state, action) => action.payload
    }
});

// change the current page
// nextPage: increase by 1
// previousPage: decrease by 1
// selectPage: set the page to the selected one
const pageSlice = createSlice({
    name: "page",
    initialState: initialPage,
    reducers: {
        nextPage: (state, action) => state + 1,
        previousPage: (state, action) => state - 1,
        selectPage: (state, action) => action.payload
    }
});


// change the currently fetched posts
const postsSlice = createSlice({
    name: "posts",
    initialState: initialPosts,
    extraReducers: {
        [fetchPosts.fulfilled]: (state, action) => action.payload
    }
});

// change the currently fetched comments
const commentsSlice = createSlice({
    name: "comments",
    initialState: initialComments,
    extraReducers: {
        [fetchComments.fulfilled]: (state, action) => action.payload
    }
});

// export the actions
export const {
    selectBoard
} = boardSlice.actions;

export const {
    nextPage, 
    previousPage,
    selectPage
} = pageSlice.actions;

const reducer = {
    board: boardSlice.reducer,
    page: pageSlice.reducer, 
    comments: commentsSlice.reducer,
    posts: postsSlice.reducer
};


export const store = configureStore({ reducer });