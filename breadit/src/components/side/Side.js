import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { customBoard, customSearch, routes } from '../../utils/constants';
import BoardList from '../common/BoardList';
import ThemeToggle from '../common/ThemeToggle';
import CurrentBoard from './CurrentBoard';

import MenuRoundedIcon from '@material-ui/icons/MenuRounded';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';

import breadit_logo50 from "../../breadit_logo50.svg";


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

    useEffect(() => {
        if (!open){
            document.querySelector("body").style.overflow = "hidden";
        }
        else{
            document.querySelector("body").style.overflow = "visible";
        }
        
    }, [open]);

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
                <span onClick={(e) => setOpen(!open)}>{open ? <MenuRoundedIcon/> : <CloseRoundedIcon />}</span>
            </div>
            <div className={`${open ? "" : "overlay"}`} onClick={() => setOpen(!open)}>
                <div className={`side ${open ? "" : "mobile"}`}>
                    <Link id="logo" to={routes.main}><img src={breadit_logo50}/></Link>
                
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
            </div>
        </>
    );
};

export default Side;
