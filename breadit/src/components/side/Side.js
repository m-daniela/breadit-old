import React, { useContext, useEffect, useState } from 'react';
import Navbar from "react-bootstrap/Navbar";
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from "react-bootstrap/FormControl";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import { Link, useHistory } from 'react-router-dom';
import { customBoard, customSearch, routes } from '../../utils/constants';
import BoardList from '../common/BoardList';
import ThemeToggle from '../common/ThemeToggle';
import CurrentBoard from './CurrentBoard';

import breadit_logo50 from "../../breadit_logo50.svg";
import { ThemeContext } from '../../context/ThemeProvider';


/**
 * Side
 * The side panel, containing the data about the currently selected
 * board, the search bars and the list of existing boards, taken  
 * from the cached state. 
 * @param {number} board id of the selected board
 */
const Side = ({board}) => {
    const {theme} = useContext(ThemeContext); 
    const [delay, setDelay] = useState(0);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchAdvancedQuery, setSearchAdvancedQuery] = useState("");
    const history = useHistory();

    // debounce for the "search in board" and "search
    // everywhere" features
    // delay data fetching for 1 second as the user
    // types in the query
    useEffect(() => {
        if (searchQuery){
            setDelay(setTimeout(() => {
                searchOnBoard();
            }, 1000));
            return clearTimeout(delay);
        }
        
    }, [searchQuery]);

    useEffect(() => {
        if (searchAdvancedQuery){
            setDelay(setTimeout(() => {
                searchEverywhere();
            }, 1000));
            return clearTimeout(delay);
        }
        
    }, [searchAdvancedQuery]);

    const searchOnBoard = (e) =>{
        e?.preventDefault();
        history.push({
            pathname: routes.search,
            search: customSearch(searchQuery, board)
        });
    };

    const searchEverywhere = (e) =>{
        e?.preventDefault();
        history.push({
            pathname: routes.search,
            search: customSearch(searchAdvancedQuery)
        });
    };
    

    return(
        <Navbar expand="lg" sticky="top" variant={theme} className="side flex-lg-column col-lg-4 align-items-start w-100">
            <Navbar.Brand id="logo" href={routes.main} className="px-3 pt-lg-3" >
                <img src={breadit_logo50}/>
                Breadit
            </Navbar.Brand>

            <Navbar.Toggle aria-controls="basic-navbar-nav" id="nav-toggle"/>
            <div className="col-12 col-lg flex-grow-0 h-100"></div>
            <Navbar.Collapse id="basic-navbar-nav" className="flex-column align-items-start px-3 col-sm-6 col-lg-12 ">
                {board &&
                    <>
                        <CurrentBoard board={board}/>
                        <Form className="w-100 mt-3" onSubmit={e => searchOnBoard(e)}>
                            <Form.Label>Search in this board</Form.Label>
                            <InputGroup >
                                <Form.Control
                                    id="search-board"
                                    type="text"
                                    aria-label="Search in this board"
                                    onChange={(e) => setSearchQuery(e.target.value)} 
                                    value={searchQuery}
                                    className="input-custom"
                                />
                                <Button id="search-board-go" className="btn-custom" type="submit">Go</Button>
                            </InputGroup>
                        </Form>
                    </> }
            
                <Form className="w-100 mt-3" onSubmit={e => searchEverywhere(e)}>
                    <Form.Label>Search everywhere</Form.Label>
                    <InputGroup>
                        <Form.Control
                            id="search-everywhere"
                            type="text"
                            aria-label="Search in this board"
                            aria-describedby="basic-addon2"
                            onChange={(e) => setSearchAdvancedQuery(e.target.value)}
                            value={searchAdvancedQuery}
                            className="input-custom"
                        />
                        <Button id="search-everywhere-go" className="btn-custom" type="submit">Go</Button>
                    </InputGroup>
                </Form>
                <BoardList addons="justify-content-start"/>
                <ThemeToggle/>

            </Navbar.Collapse>
        </Navbar>
    );
};

export default Side;
