import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { routes } from '../utils/constants';
import BoardList from './common/BoardList';
import Head from './common/Head';
import ThemeToggle from './common/ThemeToggle';
import {AdminContext} from "../context/AdminContext";


/**
 * Main Page
 * Displays a welcome message and the available boards. 
 */
const MainPage = () => {
    const {isLogged} = useContext(AdminContext);
    return (
        <>
            <Head title={"Breadit"}/>
            <div className="main-wrapper">
                <div className="main">
                    <h1>Breadit</h1>
                    <p>the cookbook of the internet</p>
                    <BoardList/>
                    <Link to={routes.admin}>{isLogged ? "To Admin page" : "Login as Admin"}</Link>
                    {/* <ThemeToggle/> */}
                </div>
            </div>
        </>
    );
};

export default MainPage;
