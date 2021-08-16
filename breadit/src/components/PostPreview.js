import React from 'react';
import { Link } from 'react-router-dom';
import { customPost } from '../utils/constants';
import {useSelector} from "react-redux";

// Post Preview
// 
const PostPreview = ({data}) => {
    const board = useSelector(state => state.board);
    const {post_id, title, description, date_created} = data;
    return (
        <Link className="post-preview" to={customPost(board, post_id)}>
            <h2>{title}</h2>
            <div className="preview-description">{description}</div>
            <div className="preview-date">{date_created}</div>
        </Link>
    );
};

export default PostPreview;
