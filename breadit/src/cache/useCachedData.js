import { useState, useEffect } from "react";
import { getBoards } from "../utils/serverCalls";

export const cache = {boards: []};

// custom hook to handle cached data
export function useCachedData(){
    const [boards, setBoards] = useState([]);

    // get the boards from the database, save them to the cache
    // so you have them available all the time
    const setBoardsCache = async () =>{
        // check if the boards data is cached
        if (cache.boards.length === 0){
            try{
                // if there are no boards saved in the 
                // cache, fetch the data from the server
                // and save it to the local state
                const data = await getBoards();
                cache.boards = data;
                setBoards(data);
            } 
            catch (err){
                cache.boards = [];
            }  
        }
        else{
            setBoards(cache.boards);
        }
    };


    useEffect(async () => {
        await setBoardsCache();
    }, []);

    return boards;
}