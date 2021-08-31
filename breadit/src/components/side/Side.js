import React, { useContext, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { useCachedData } from '../../cache/useCachedData';
import { AddPostContext } from '../../context/AddPostProvider';
import { selectBoard, updateSearch } from '../../store/redux';
import { customBoard, customSearch, routes, searchUrl } from '../../utils/constants';
import BoardList from '../common/BoardList';

const Side = ({board}) => {
    const {showAddOverlay} = useContext(AddPostContext);
    const boards = useCachedData();
    // const search = useState(state => state.search.query);
    const [boardData, setBoardData] = useState({});
    const [searchQuery, setSearchQuery] = useState("");
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(()=>{
        // get the information about the currently selected board
        const getBoardInfo = (board, boards) => {
            const result = boards.filter(elem => elem.board_id === board);
            return result[0];
        };

        if (boards.length !== 0) { 
            const boardInfo = getBoardInfo(board, boards);
            setBoardData(boardInfo);
            dispatch(selectBoard(boardInfo));
        }
    }, [board, boards]);

    const addPost = () => {
        showAddOverlay();
    };

    const searchOnBoard = (e) =>{
        e.preventDefault();
        history.push({
            pathname: routes.search,
            search: customSearch(board, searchQuery)
        });
        dispatch(updateSearch(searchQuery));
        
    };
    

    return (
        <div className="side">
            <Link to={customBoard(board)}><h2>{boardData?.name}</h2></Link>
            
            <div>{boardData?.description}</div>
            <button id="add-post" onClick={addPost}>Add post</button>
            <form onSubmit={e => searchOnBoard(e)}>
                <label>
                    Search in this board
                </label>
                <input type="text" onChange={(e) => setSearchQuery(e.target.value)} value={searchQuery}/>
                <button type="submit">Go</button>

            </form>
            {/* <button>Advanced search</button> */}
            
            <BoardList/>
        </div>
    );
};

export default Side;
