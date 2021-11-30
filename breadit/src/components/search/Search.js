import React, { useEffect, useContext } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { AddPostContext } from '../../context/AddPostProvider';
import { fetchSearch } from '../../store/redux';
import Head from '../common/Head';
import AddPost from '../side/AddPost';
import Side from '../side/Side';
import PaginatedSearch from './PaginatedSearch';

/**
 * Search
 * The search component which is shown when the user searches 
 * for a query, either in the current board or in between all 
 * posts. The board, query and page are taken from the query 
 * string and the results are fetched based on them.  
 * @returns 
 */
const Search = () => {
    const {addPost} = useContext(AddPostContext);
    const location = new URLSearchParams(useLocation().search);
    const board = location.get("b");
    const query = location.get("q");
    const page = location.get("page");
    const dispatch = useDispatch(); 

    useEffect(() => {
        dispatch(fetchSearch({board, query, page}));
    }, [query, page]);
    
    return (
        <>
            <Head title={`Search ${query}`}/>
            <div className="board-wrapper col-12 col-lg-6">
                <div className="board px-0 col-12">
                    {addPost 
                        ? 
                        <AddPost/>
                        :
                        <PaginatedSearch query={location} />
                    }
                    
                </div>
            </div>
            <Side board={board}/>

        </>
    );
};

export default Search;
