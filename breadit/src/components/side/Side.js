import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { customBoard, customSearch, routes } from '../../utils/constants';
import BoardList from '../common/BoardList';
import ThemeToggle from '../common/ThemeToggle';
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
    const [open, setOpen] = useState(true);
    const [searchAdvancedQuery, setSearchAdvancedQuery] = useState("");
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
        <>
            <div className="header-mobile">
                <Link to={routes.main}>breadit</Link>
                <Link to={customBoard(board)}>{board}</Link>
                <span onClick={(e) => setOpen(!open)}>|||</span>
            </div>
            <div className={`side ${open ? "" : "mobile"}`}>
                <Link id="logo" to={routes.main}>Breadit logo</Link>
                
                {board ? 
                    <>
                        <CurrentBoard board={board}/>
                        <form onSubmit={e => searchOnBoard(e)}>
                            <label>
                                <span>Search in this board</span>
                                <input id="search-board" type="text" onChange={(e) => setSearchQuery(e.target.value)} value={searchQuery}/>
                                <button id="search-board-go" type="submit">Go</button>
                            </label>
                        
                        </form>
                    </> : <></>}
            
                <form onSubmit={e => searchEverywhere(e)}>
                    <label>
                        <span>Search everywhere</span>
                        <input id="search-everywhere" type="text" onChange={(e) => setSearchAdvancedQuery(e.target.value)} value={searchAdvancedQuery}/>
                        <button id="search-everywhere-go" type="submit">Go</button>
                    </label>
                

                </form>
                <BoardList/>
                <ThemeToggle/>

            </div>
        </>
    );
};

export default Side;
