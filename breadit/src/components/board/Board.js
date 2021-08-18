import React, { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { AddPostContext } from '../../context/AddPostProvider';
import { fetchPosts, selectBoard } from '../../store/redux';
import { useDispatch, useSelector } from 'react-redux';
import AddPost from '../side/AddPost';
import PostPreview from './PostPreview';
import Side from '../side/Side';
import PostSkeleton from '../common/PostSkeleton';
import Head from '../common/Head';

// 
const Board = () => {
    const {addPost} = useContext(AddPostContext);
    const {board} = useParams();
    const {name} = useSelector(state => state.board);
    const dispatch = useDispatch();

    // TODO: obtain the first 10 posts and display them
    // retrieve id, title, description and date_created
    
    const posts = useSelector(state => state.posts);

    useEffect(() => {
        // dispatch(selectBoard(board));
        dispatch(fetchPosts(board));
        
        return () => {
        };
    }, [board]);
    
    return (
        <>
            <Head title={name}/>
            <div className="board-wrapper">
                <div className="board">
                    {addPost 
                        ? 
                        <AddPost/>
                        :
                        <>
                            {posts.length !== 0 ? 
                                posts.map(elem => <PostPreview key={elem.post_id} data={elem} />)
                                :
                                <PostSkeleton />
                            }
                        </>
                    }
                </div>
                <Side board={board}/>
            </div>
        </>
    );
};

export default Board;
