import React, { useContext, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { useCachedData } from '../../cache/useCachedData';
import { AddPostContext } from '../../context/AddPostProvider';
import { selectBoard } from '../../store/redux';
import { customBoard } from '../../utils/constants';
import Button from "react-bootstrap/Button";

/**
 * Current Board
 * Display the information of the currently selected board 
 * in the Side panel, as well as the option to add a new
 * post. This component is not shown if no board is selected
 * @param {*} board the id of the currently selected board
 */
const CurrentBoard = ({board}) => {
    const {showAddOverlay} = useContext(AddPostContext);
    const boards = useCachedData();
    const [boardData, setBoardData] = useState({});
    const dispatch = useDispatch();

    useEffect(()=>{
        // get the information about the currently selected board
        // from the cached data
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
            <Button id="add-post" className="btn-custom mt-3" onClick={addPost}>Add post</Button>
        </>
    );
};

export default CurrentBoard;
