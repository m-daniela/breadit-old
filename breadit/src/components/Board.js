import React, { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { AddPostContext } from '../context/AddPostProvider';
import { fetchPosts, selectBoard } from '../store/redux';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from '../utils/serverCalls';
import AddPost from './AddPost';
import PostPreview from './PostPreview';
import Side from './Side';

const Board = () => {
    const {addPost} = useContext(AddPostContext);
    const {board} = useParams();
    const dispatch = useDispatch();
    dispatch(selectBoard(board));

    // TODO: obtain the first 10 posts and display them
    // retrieve id, title, description and date_created
    
    const posts = useSelector(state => state.posts);

    useEffect(() => {

        dispatch(fetchPosts(board));
        
        return () => {
        };
    }, [board]);
    
    return (
        <div className="board-wrapper">
            <div className="board">
                {addPost 
                    ? 
                    <AddPost/>
                    :
                    <>
                        {posts.map(elem => <PostPreview key={elem.post_id} data={elem} />)}
                    </>
                }
            </div>
            <Side board={board}/>
        </div>
    );
};

export default Board;
