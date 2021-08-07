import React from 'react';
import {Link} from "react-router-dom";
import { customBoard } from '../utils/constants';
import { getBoards } from '../utils/serverCalls';

// Main Page
// display all the boards that are available
const MainPage = () => {
    // TODO: get the boards from the server
    const boards = getBoards();
    return (
        <div className="main-wrapper">
            <div className="main">
                <h1>Breadit</h1>
                <p>Write stuff and all that</p>
                <div className="boards">
                    {boards.map(elem => <Link key={elem.board} to={customBoard(elem.board)}>{elem.name}</Link>)}
                </div>
            </div>
        </div>
    );
};

export default MainPage;
