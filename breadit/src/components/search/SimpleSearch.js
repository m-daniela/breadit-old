import React, { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { fetchSearch } from '../../store/redux';
import Head from '../common/Head';
import Side from '../side/Side';
import PaginatedSearch from './PaginatedSearch';

const SimpleSearch = () => {
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
            <div className="board-wrapper">
                <div className="board">
                    <PaginatedSearch query={location} />
                </div>
                <Side board={board}/>
            </div>
        </>
    );
};

export default SimpleSearch;
