import React, { useState, useEffect, useContext } from 'react';
import BoardList from './BoardList';

// Main Page
// display all the boards that are available
const MainPage = () => {
    // const [boards, setBoards] = useState([]);
    // // TODO: get the boards from the server

    // useEffect(() => {
        
    //     getBoards()
    //         .then(res => setBoards(res))
    //         // .then(res => console.log(res))
    //         .catch(err => console.log(err));
    //     return () => {
           
    //     };
    // }, []);
    
    return (
        <div className="main-wrapper">
            <div className="main">
                <h1>Breadit</h1>
                <p>Write stuff and all that</p>
                <BoardList/>

            </div>
        </div>
    );
};

export default MainPage;
