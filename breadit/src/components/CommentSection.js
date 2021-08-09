import React, {useState, useEffect} from 'react';
import { getComments } from '../utils/serverCalls';
import Comment from './Comment';

const CommentSection = ({currentPost}) => {
    const [comments, setComments] = useState([]);
    const board = "b";

    useEffect(() => {
        getComments(board, currentPost)
            .then(res => setComments(res))
            .catch(err => console.log(err));
            
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
