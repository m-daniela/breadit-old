import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { fetchPosts, nextPage, previousPage, selectPage } from '../../store/redux';
import { customBoard, customSearch, routes, searchUrl } from '../../utils/constants';
import PostPreview from '../board/PostPreview';
import PostSkeleton from '../common/PostSkeleton';


/**
 * Paginated Search
 * Shows the 10 posts from the search results, in descending order
 * based on the date added, if found. Otherwise, an error is shown
 */
const PaginatedSearch = ({query}) => {
    const board = query.get("b");
    const searchedQuery = query.get("q");
    const page = +query.get("page");
    const posts = useSelector(state => state.search.results);

    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(()=>{
        dispatch(selectPage(page));
    }, [page]);
    

    const clickNextPage = () => {
        history.push({
            pathname: routes.search,
            search: customSearch(searchedQuery, board, page + 1)
        });
        dispatch(nextPage());
    };

    const clickPreviousPage = () => {
        if (page > 1){
            history.push({
                pathname: routes.search,
                search: customSearch(searchedQuery, board, page - 1)
            });
            dispatch(previousPage());
        }
        else{
            history.push({
                pathname: routes.search,
                search: customSearch(searchedQuery, board)
            });
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

export default PaginatedSearch;
