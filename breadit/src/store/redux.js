import { configureStore, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getComments, getPosts, getSearchResults } from '../utils/serverCalls';

const initialBoard = {};
const initialPage = 1;
const initialPosts = [];
const initialComments = [];
const initialSearch = {
    query: "", 
    results: []
};


// middleware

// fetch the posts for the selected board
export const fetchPosts = createAsyncThunk(
    "posts/fetchPosts", 
    async ({board, page}, thunkAPI) => {
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

// fetch the results of the searched query
export const fetchSearch = createAsyncThunk(
    "search/fetchSearch", 
    async ({ board, query, page }, thunkAPI) => {
        const posts = await getSearchResults(board, query, page);
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
    reducers: {
        removePost: (state, action) => {
            const posts = state.filter(post => post.post_id !== action.payload);
            return posts;
        }
    },
    extraReducers: {
        [fetchPosts.fulfilled]: (state, action) => action.payload
    }
});

// change the currently fetched comments
const commentsSlice = createSlice({
    name: "comments",
    initialState: initialComments,
    reducers: {
        removeComment: (state, action) => {
            const comments = state.filter(comment => comment.comment_id !== action.payload);
            return comments;
        }
    },
    extraReducers: {
        [fetchComments.fulfilled]: (state, action) => action.payload
    }
});

// search query and results
const searchSlice = createSlice({
    name: "search",
    initialState: initialSearch,
    reducers: {
        updateSearch: (state, action) => {
            state.query = action.payload;
        }
    },
    extraReducers: {
        [fetchSearch.fulfilled]: (state, action) => {
            state.results = action.payload;
        }
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

export const {
    updateSearch
} = searchSlice.actions;

export const {
    removeComment
} = commentsSlice.actions;

export const {
    removePost
} = postsSlice.actions;

const reducer = {
    board: boardSlice.reducer,
    page: pageSlice.reducer, 
    comments: commentsSlice.reducer,
    posts: postsSlice.reducer,
    search: searchSlice.reducer
};


export const store = configureStore({ reducer });