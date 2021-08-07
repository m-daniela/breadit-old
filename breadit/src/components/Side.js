import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AddPostContext } from '../context/AddPostProvider';
import { customBoard } from '../utils/constants';
import { getBoards } from '../utils/serverCalls';

const Side = ({board}) => {
    const {showAddOverlay} = useContext(AddPostContext);
    const boards = getBoards();

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
            <div className="boards">
                {boards.map(elem => <Link key={elem.board} to={customBoard(elem.board)}>{elem.name}</Link>)}
            </div>
        </div>
    );
};

export default Side;
