import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { updateSearch } from '../../store/redux';
import { customSearch, routes } from '../../utils/constants';
import BoardList from '../common/BoardList';
import CurrentBoard from './CurrentBoard';

/**
 * Side
 * The side panel, containing the data about the currently selected
 * board, the search bars and the list of existing boards, taken  
 * from the cached state. 
 * @param {number} board id of the selected board
 * @returns 
 */
const Side = ({board}) => {
    const [delay, setDelay] = useState(0);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchAdvancedQuery, setSearchAdvancedQuery] = useState("");
    const dispatch = useDispatch();
    const history = useHistory();

    // debounce for the "search in board" and "search
    // everywhere" features
    // delay data fetching for 1 second as the user
    // types in the query
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
                            <input type="text" onChange={(e) => setSearchQuery(e.target.value)} value={searchQuery}/>
                            <button type="submit">Go</button>
                        </label>
                        
                    </form>
                </> : <></>}
            
            <form onSubmit={e => searchEverywhere(e)}>
                <label>
                    Search everywhere
                    <input type="text" onChange={(e) => setSearchAdvancedQuery(e.target.value)} value={searchAdvancedQuery}/>
                    <button type="submit">Go</button>
                </label>
                

            </form>
            <BoardList/>
        </div>
    );
};

export default Side;
