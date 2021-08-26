import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchPosts, nextPage, previousPage } from '../../store/redux';
import { customBoard } from '../../utils/constants';
import PostSkeleton from '../common/PostSkeleton';
import PostPreview from './PostPreview';


// TODO: error handling 
const PaginatedPreview = () => {
    const {board_id} = useSelector(state => state.board);
    const page = useSelector(state => state.page);
    const posts = useSelector(state => state.posts);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchPosts({board: board_id, page}));
        return () => {
        };
    }, [board_id, page]);

    const clickNextPage = () => {
        dispatch(nextPage());
    };

    const clickPreviousPage = () => {
        dispatch(previousPage());
    };



    return (
        <div className="paginated-preview">
            {posts.length !== 0 ? 
                posts.map(elem => <PostPreview key={elem.post_id} data={elem} />)
                :
                <PostSkeleton />
            }
            {/* {posts.map(elem => <PostPreview key={elem.post_id} data={elem} />)} */}
            <div className="buttons">
                <button onClick={clickPreviousPage}><Link to={customBoard(board_id, page-1)}>Previous</Link></button>
                <span>{page}</span>
                <button onClick={clickNextPage}><Link to={customBoard(board_id, page+1)}>Next</Link></button>
            </div>
        </div>
    );
};

export default PaginatedPreview;
