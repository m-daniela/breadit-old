import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { AddPostContext } from '../context/AddPostProvider';
import AddPost from './AddPost';
import PostPreview from './PostPreview';
import Side from './Side';

const Board = () => {
    const {addPost} = useContext(AddPostContext);
    const {board} = useParams();
    // TODO: obtain the first 10 posts and display them
    // retrieve id, title, description and date_created
    return (
        <div className="board-wrapper">
            <div className="board">
                {addPost ? 
                    <AddPost></AddPost>
                    :
                    <>
                        <PostPreview></PostPreview>
                        <PostPreview></PostPreview>
                        <PostPreview></PostPreview>
                    </>}
                
            </div>
            <Side board={board}/>
        </div>
    );
};

export default Board;
