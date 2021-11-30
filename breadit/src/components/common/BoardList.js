import React, {useContext} from 'react';
import { Link } from 'react-router-dom';
import { useCachedData } from '../../cache/useCachedData';
import { customBoard } from '../../utils/constants';

/**
 * Board List
 * Shows the list of available boards, saved in the 
 * cached list
 */
const BoardList = ({addons}) => {
    const boards = useCachedData();

    return (
        <div className={`boards py-4 ${addons}`}>
            {boards.map(elem => <Link key={elem.board_id} to={customBoard(elem.board_id)}>{elem.name}</Link>)}
        </div>
    );
};

export default BoardList;
