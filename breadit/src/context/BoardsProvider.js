import React, {createContext, useState, useEffect} from 'react';
import { getBoards } from '../utils/serverCalls';

export const BoardsContext = createContext();


// THIS WILL BE TURNED INTO SOME CACHE THING
// get the boards from the database so you have them available
// all the time
const BoardsProvider = ({children}) => {
    const [boards, setBoards] = useState([]);
    useEffect(() => {
        
        getBoards()
            .then(res => setBoards(res))
            .catch(err => console.log(err));
        return () => {
           
        };
    }, []);
    return (
        <BoardsContext.Provider value={boards}>
            {children}
        </BoardsContext.Provider>
    );
};

export default BoardsProvider;