import React, { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { AddPostContext } from '../context/AddPostProvider';
import { fetchPosts, selectBoard } from '../store/redux';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from '../utils/serverCalls';
import AddPost from './AddPost';
import PostPreview from './PostPreview';
import Side from './Side';

const Board = () => {
    const {addPost} = useContext(AddPostContext);
    const {board} = useParams();
    const dispatch = useDispatch();
    dispatch(selectBoard(board));

    // TODO: obtain the first 10 posts and display them
    // retrieve id, title, description and date_created
    const [posts, setPosts] = useState([]);
    const posts1 = useSelector(state => state.posts);

    useEffect(() => {
        dispatch(fetchPosts(board));
        // getPosts(board)
        //     .then(res => setPosts(res))
        //     .catch(err => console.log(err));
        
        return () => {
        };
    }, [board]);
    
    return (
        <div className="board-wrapper">
            <div className="board">
                {addPost 
                    ? 
                    <AddPost></AddPost>
                    :
                    <>
                        {posts1.map(elem => <PostPreview key={elem.post_id} data={elem} />)}
                    </>
                }
            </div>
            <Side board={board}/>
        </div>
    );
};

export default Board;
