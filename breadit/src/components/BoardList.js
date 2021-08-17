import React, {useContext} from 'react';
import { Link } from 'react-router-dom';
import { useCachedData } from '../cache/useCachedData';
import { customBoard } from '../utils/constants';

// Show the list of available boards
const BoardList = () => {
    const boards = useCachedData();

    return (
        <div className="boards">
            {boards.map(elem => <Link key={elem.board_id} to={customBoard(elem.board_id)}>{elem.name}</Link>)}
        </div>
    );
};

export default BoardList;
