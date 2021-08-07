import React from 'react';
import { Link } from 'react-router-dom';
import { customPost } from '../utils/constants';

const PostPreview = ({id, title, description, date}) => {
    // TODO: get the information for the post
    const board = "b";
    const post = 123;
    return (
        <Link className="post-preview" to={customPost(board, post)}>
            <h2>Title</h2>
            <div className="preview-description">description</div>
            <div className="preview-date">date</div>
        </Link>
    );
};

export default PostPreview;
