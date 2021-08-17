import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useCachedData } from '../cache/useCachedData';
import { AddPostContext } from '../context/AddPostProvider';
import { customBoard } from '../utils/constants';
import BoardList from './BoardList';

const Side = ({board}) => {
    const {showAddOverlay} = useContext(AddPostContext);
    const boards = useCachedData();
    const [boardData, setBoardData] = useState({});

    useEffect(()=>{
        // get the information about the currently selected board
        const getBoardInfo = (board, boards) => {
            const result = boards.filter(elem => elem.board_id === board);
            return result[0];
        };

        if (boards.length !== 0) { 
            setBoardData(getBoardInfo(board, boards));
        }
    }, [board, boards]);

    const addPost = () => {
        showAddOverlay();
    };
    

    return (
        <div className="side">
            <Link to={customBoard(board)}><h2>{boardData?.name}</h2></Link>
            
            <div>{boardData?.description}</div>
            <button id="add-post" onClick={addPost}>Add post</button>
            <form>
                <label>
                    Search
                </label>
                <input type="text" />
                <label>
                    Search in board
                </label>
                <input type="text" />
            </form>
            <BoardList/>
        </div>
    );
};

export default Side;
