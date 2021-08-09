import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AddPostContext } from '../context/AddPostProvider';
import { BoardsContext } from '../context/BoardsProvider';
import { customBoard } from '../utils/constants';
import { getBoards } from '../utils/serverCalls';
import BoardList from './BoardList';

const Side = ({board}) => {
    const {showAddOverlay} = useContext(AddPostContext);

    const addPost = () => {
        showAddOverlay();
    };

    return (
        <div className="side">
            <Link to={customBoard(board)}><h2>{board}</h2></Link>
            
            <div>description</div>
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
