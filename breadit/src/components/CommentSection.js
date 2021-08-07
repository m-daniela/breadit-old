import React from 'react';
import Comment from './Comment';

const CommentSection = () => {
    return (
        <div className="comment-section">
            <Comment></Comment>
            <Comment>
                <Comment></Comment>
            </Comment>
        </div>
    );
};

export default CommentSection;
