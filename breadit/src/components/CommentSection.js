import React, {useState, useEffect} from 'react';
import { getComments } from '../utils/serverCalls';
import Comment from './Comment';
import {useDispatch, useSelector} from "react-redux";
import { fetchComments } from '../store/redux';


const CommentSection = ({currentPost}) => {
    const comments = useSelector(state => state.comments);
    const dispatch = useDispatch();
    const board = useSelector(state => state.board);

    useEffect(() => {
        dispatch(fetchComments({board, post: currentPost}));
        return () => {
        };
    }, []);
    return (
        <div className="comment-section">
            {comments.map(elem => <Comment key={elem.comment_id} data={elem}/>)}
        </div>
    );
};

export default CommentSection;
