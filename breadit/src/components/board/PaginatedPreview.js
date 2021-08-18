import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { nextPage, previousPage } from '../../store/redux';
import { customBoard } from '../../utils/constants';
import PostSkeleton from '../common/PostSkeleton';
import PostPreview from './PostPreview';


// TODO: error handling 
const PaginatedPreview = ({posts}) => {
    const {board_id} = useSelector(state => state.board);
    const page = useSelector(state => state.page);
    const dispatch = useDispatch();

    const clickNextPage = () => {
        dispatch(nextPage());
    };

    const clickPreviousPage = () => {
        dispatch(previousPage());
    };



    return (
        <div className="paginated-preview">
            {posts.length !== 0 ? 
                posts.map(elem => <PostPreview key={elem.post_id} data={elem} />)
                :
                <PostSkeleton />
            }
            {/* {posts.map(elem => <PostPreview key={elem.post_id} data={elem} />)} */}
            <div className="buttons">
                <button onClick={clickPreviousPage}><Link to={customBoard(board_id, page-1)}>Previous</Link></button>
                <button onClick={clickNextPage}><Link to={customBoard(board_id, page+1)}>Next</Link></button>
            </div>
        </div>
    );
};

export default PaginatedPreview;
