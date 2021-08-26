import React, { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { AddPostContext } from '../../context/AddPostProvider';
import { fetchPosts, selectBoard, selectPage } from '../../store/redux';
import { useDispatch, useSelector } from 'react-redux';
import AddPost from '../side/AddPost';
import PostPreview from './PostPreview';
import Side from '../side/Side';
import PostSkeleton from '../common/PostSkeleton';
import Head from '../common/Head';
import PaginatedPreview from './PaginatedPreview';

// 
const Board = () => {
    const {addPost} = useContext(AddPostContext);
    const {board, page} = useParams();
    const {name} = useSelector(state => state.board);
    const currentPage = +page ?? 1;
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(selectPage(+currentPage));
  
        return () => {
        };
    }, [board, currentPage]);
    
    // useEffect(() => {
    //     dispatch(fetchPosts({board, page}));
    //     return () => {
    //     };
    // }, [board, page]);

    return (
        <>
            <Head title={name}/>
            <div className="board-wrapper">
                <div className="board">
                    {addPost 
                        ? 
                        <AddPost/>
                        :
                        <PaginatedPreview />
                        // <>
                        //     {posts.length !== 0 ? 
                        //         // posts.map(elem => <PostPreview key={elem.post_id} data={elem} />)
                        //         <PaginatedPreview posts={posts}/>
                        //         :
                        //         <PostSkeleton />
                        //     }
                        // </>
                    }
                </div>
                <Side board={board}/>
            </div>
        </>
    );
};

export default Board;
