import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { AddPostContext } from '../../context/AddPostProvider';
import { selectPage } from '../../store/redux';
import { useDispatch, useSelector } from 'react-redux';
import AddPost from '../side/AddPost';
import Side from '../side/Side';
import Head from '../common/Head';
import PaginatedPreview from './PaginatedPreview';

/**
 * Board
 * A component which shows post previews or an error message,
 * of none could be fetched.
 */
const Board = () => {
    const {addPost} = useContext(AddPostContext);
    const {board, page} = useParams();
    const {name} = useSelector(state => state.board);
    const currentPage = +page ?? 1;
    const dispatch = useDispatch();

    // set the current page, according to the given 
    // page parameter
    // TODO: change to query string?
    useEffect(() => {
        if (currentPage > 1){
            dispatch(selectPage(currentPage));
        }
        else{
            dispatch(selectPage(1));
        }
    }, [board, currentPage]);

    return (
        <>
            <Head title={name}/>
            
            <div className="board-wrapper">
                <div className="board">
                    {addPost 
                        ? 
                        <AddPost/>
                        :
                        <PaginatedPreview />
                    }
                </div>
                <Side board={board}/>
            </div>
        </>
    );
};

export default Board;
