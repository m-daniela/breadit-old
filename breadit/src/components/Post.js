import React from 'react';
import { useParams } from 'react-router-dom';
import Comment from './Comment';
import CommentSection from './CommentSection';
import Side from './Side';

const Post = () => {
    const {board, post} = useParams();
    return (
        <div className="post-wrapper">
            <div className="post">
                <div className="post-info">
                    You are on post {post}, board {board}
                    <h1>Title</h1>
                    <div className="post-date">date</div>
                    <div className="post-description">description</div>
                </div>
                <form className="add-comment">
                    <textarea></textarea>
                    <button>Add comment</button>
                </form>
                <CommentSection></CommentSection>
            </div>
            <Side board={board}/>
        </div>
    );
};

export default Post;
