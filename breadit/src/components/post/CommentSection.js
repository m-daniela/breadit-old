import React, {useEffect} from 'react';
import Comment from './Comment';
import {useDispatch, useSelector} from "react-redux";
import { fetchComments } from '../../store/redux';

/**
 * Comment Section
 * Fetches and displays the comments for the given post, in a list
 * ordered by posting date, descending. 
 * @param {number} currentPost id of the currently selected post
 */
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
    }, [currentPost, board_id]);
    
    return (
        <div className="comment-section p-0">
            {comments.map(elem => <Comment key={elem.comment_id} data={elem}/>)}
        </div>
    );
};

export default CommentSection;
