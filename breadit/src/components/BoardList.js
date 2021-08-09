import React, {useContext} from 'react';
import { Link } from 'react-router-dom';
import { BoardsContext } from '../context/BoardsProvider';
import { customBoard } from '../utils/constants';

const BoardList = () => {
    const boards = useContext(BoardsContext);

    return (
        <div className="boards">
            {boards.map(elem => <Link key={elem.board_id} to={customBoard(elem.board_id)}>{elem.name}</Link>)}
        </div>
    );
};

export default BoardList;
