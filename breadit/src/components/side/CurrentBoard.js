import React, { useContext, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { useCachedData } from '../../cache/useCachedData';
import { AddPostContext } from '../../context/AddPostProvider';
import { selectBoard } from '../../store/redux';
import { customBoard } from '../../utils/constants';

const CurrentBoard = ({board}) => {
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
    return (
        <>
            <Link to={customBoard(board)}><h2>{boardData?.name}</h2></Link>
            
            <div>{boardData?.description}</div>
            <button id="add-post" onClick={addPost}>Add post</button>
        </>
    );
};

export default CurrentBoard;
