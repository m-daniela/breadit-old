import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { fetchPosts, nextPage, previousPage, selectPage } from '../../store/redux';
import { customBoard } from '../../utils/constants';
import PostSkeleton from '../common/PostSkeleton';
import PostPreview from './PostPreview';


/**
 * Paginated Preview
 * Shows the 10 posts from the current page in descending order
 * based on the date added, if found
 * Otherwise, an error message is shown
 */
const PaginatedPreview = () => {
    const {board_id} = useSelector(state => state.board);
    const page = useSelector(state => state.page);
    const posts = useSelector(state => state.posts);

    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        dispatch(fetchPosts({board: board_id, page}));
    }, [board_id, page]);

    const clickNextPage = () => {
        history.push(customBoard(board_id, page+1));
        dispatch(nextPage());
    };

    const clickPreviousPage = () => {
        if (page > 1){
            history.push(customBoard(board_id, page-1));
            dispatch(previousPage());
        }
        else{
            history.push(customBoard(board_id, 1));
            dispatch(selectPage(1));
        }
    };

    return (
        <div className="paginated-preview">
            {posts.length !== 0 ? 
                posts.map(elem => <PostPreview key={elem.post_id} data={elem} />)
                :
                <PostSkeleton />
            }
            <div className="buttons">
                <button onClick={clickPreviousPage}>Previous</button>
                <span>{page}</span>
                <button onClick={clickNextPage}>Next</button>
            </div>
        </div>
    );
};

export default PaginatedPreview;
