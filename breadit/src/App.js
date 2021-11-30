import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import './styles/main.scss';

import {routes} from "./utils/constants";
import MainPage from "./components/MainPage";
import Board from "./components/board/Board";
import Post from "./components/post/Post";
import AddPostProvider from "./context/AddPostProvider";
import Search from "./components/search/Search";
import ThemeProvider from "./context/ThemeProvider";
import Admin from "./components/admin/Admin";
import AdminProvider from "./context/AdminContext";


function App() {
    return (
        <Router>
            <AdminProvider>
                <ThemeProvider>
                    <AddPostProvider>
                        <div className="app container row m-auto flex-column flex-lg-row justify-content-around">
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
                                <Route exact path={routes.search}>
                                    <Search />
                                </Route>
                                <Route exact path={routes.admin}>
                                    <Admin />
                                </Route>
                            </Switch>
                        </div>
                    </AddPostProvider>
                </ThemeProvider>
            </AdminProvider>
        </Router>
    );
}

export default App;
