import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { routes } from '../utils/constants';
import BoardList from './common/BoardList';
import Head from './common/Head';
import {AdminContext} from "../context/AdminContext";

import Col from "react-bootstrap/Col";

/**
 * Main Page
 * Displays a welcome message and the available boards. 
 */
const MainPage = () => {
    const {isLogged} = useContext(AdminContext);
    return (
        <>
            <Head title={"Breadit"}/>
            <div className="wrapper container d-flex align-items-center justify-content-center vh-100">
                <div className="landing row flex-column justify-content-center align-items-center m-auto py-5">
                    <h1>Breadit</h1>
                    <p>the cookbook of the internet</p>
                    <BoardList addons="col-6"/>
                    <Link to={routes.admin}>{isLogged ? "To Admin page" : "Login as Admin"}</Link>
                </div>
            </div>
        </>
    );
};

export default MainPage;
