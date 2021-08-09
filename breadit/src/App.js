import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";

import {routes} from "./utils/constants";
import './styles/App.scss';
import MainPage from "./components/MainPage";
import Board from "./components/Board";
import Post from "./components/Post";
import AddPostProvider from "./context/AddPostProvider";
import BoardsProvider from "./context/BoardsProvider";


function App() {
    return (
        <Router>
            <BoardsProvider>
                <AddPostProvider>
                    <div className="App">
                        <Switch>
                            <Route exact path={routes.main}>
                                <MainPage />
                            </Route>
                            <Route exact path={routes.board}>
                                <Board />
                            </Route>
                            <Route exact path={routes.post}>
                                <Post />
                            </Route>
                        </Switch>
                    </div>
                </AddPostProvider>
            </BoardsProvider>
        </Router>
        
    );
}

export default App;
