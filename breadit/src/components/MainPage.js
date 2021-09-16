import React from 'react';
import BoardList from './common/BoardList';
import Head from './common/Head';
import ThemeToggle from './common/ThemeToggle';


/**
 * Main Page
 * Displays a welcome message and the available boards. 
 * @returns 
 */
const MainPage = () => {
    return (
        <>
            <Head title={"Breadit"}/>
            <div className="main-wrapper">
                <div className="main">
                    <h1>Breadit</h1>
                    <p>Write stuff and all that</p>
                    <BoardList/>
                    <ThemeToggle/>
                </div>
            </div>
        </>
    );
};

export default MainPage;
