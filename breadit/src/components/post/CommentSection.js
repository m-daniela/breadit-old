import React, {useState, useEffect} from 'react';
import Comment from './Comment';
import {useDispatch, useSelector} from "react-redux";
import { fetchComments } from '../../store/redux';


const CommentSection = ({currentPost}) => {
    const comments = useSelector(state => state.comments);
    const dispatch = useDispatch();
    const {board_id} = useSelector(state => state.board);

    useEffect(() => {
        if (board_id) {
            dispatch(fetchComments({board: board_id, post: currentPost}));
        }
        return () => {
        };
    }, [board_id]);
    
    return (
        <div className="comment-section">
            {comments.map(elem => <Comment key={elem.comment_id} data={elem}/>)}
        </div>
    );
};

export default CommentSection;
