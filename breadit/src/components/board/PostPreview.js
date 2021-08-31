import React from 'react';
import { Link } from 'react-router-dom';
import { customPost } from '../../utils/constants';
import {useSelector} from "react-redux";
import { getRelativeTime } from '../../utils/relativeTime';

// Post Preview
// 
const PostPreview = ({data}) => {
    const {board_id} = useSelector(state => state.board);
    const {post_id, title, description, date_created, board_name} = data;
    return (
        <Link className="post-preview" to={customPost(board_id ?? board_name, post_id)}>
            <h2>{title}</h2>
            <div className="preview-description">{description}</div>
            <div className="preview-date">{getRelativeTime(date_created)}</div>
        </Link>
    );
};

export default PostPreview;
