import React, { useState, useEffect, useContext } from 'react';
import BoardList from './common/BoardList';
import Head from './common/Head';

// Main Page
// display all the boards that are available
const MainPage = () => {
    
    return (
        <>
            <Head title={"Breadit"}/>
            <div className="main-wrapper">
                <div className="main">
                    <h1>Breadit</h1>
                    <p>Write stuff and all that</p>
                    <BoardList/>

                </div>
            </div>
        </>
    );
};

export default MainPage;
