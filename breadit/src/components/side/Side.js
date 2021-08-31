import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { updateSearch } from '../../store/redux';
import { customSearch, routes } from '../../utils/constants';
import BoardList from '../common/BoardList';
import CurrentBoard from './CurrentBoard';

const Side = ({board}) => {
    const [delay, setDelay] = useState(0);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchAdvancedQuery, setSearchAdvancedQuery] = useState("");
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        if (searchQuery){
            setDelay(setTimeout(() => {
                searchOnBoard();
            }, 1000));
            return clearTimeout(delay);
        }
        
    }, [searchQuery]);

    useEffect(() => {
        if (searchAdvancedQuery){
            setDelay(setTimeout(() => {
                searchEverywhere();
            }, 1000));
            return clearTimeout(delay);
        }
        
    }, [searchAdvancedQuery]);

    const searchOnBoard = (e) =>{
        e?.preventDefault();
        history.push({
            pathname: routes.search,
            search: customSearch(searchQuery, board)
        });
    };

    const searchEverywhere = (e) =>{
        e?.preventDefault();
        history.push({
            pathname: routes.search,
            search: customSearch(searchAdvancedQuery)
        });
    };
    

    return (
        <div className="side">
            {board ? 
                <>
                    <CurrentBoard board={board}/>
                    <form onSubmit={e => searchOnBoard(e)}>
                        <label>
                            Search in this board
                        </label>
                        <input type="text" onChange={(e) => setSearchQuery(e.target.value)} value={searchQuery}/>
                        <button type="submit">Go</button>
                    </form>
                </> : <></>}
            
            <form onSubmit={e => searchEverywhere(e)}>
                <label>
                    Search everywhere
                </label>
                <input type="text" onChange={(e) => setSearchAdvancedQuery(e.target.value)} value={searchAdvancedQuery}/>
                <button type="submit">Go</button>

            </form>
            <BoardList/>
        </div>
    );
};

export default Side;
