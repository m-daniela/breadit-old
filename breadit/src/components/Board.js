import React, { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { AddPostContext } from '../context/AddPostProvider';
import { getPosts } from '../utils/serverCalls';
import AddPost from './AddPost';
import PostPreview from './PostPreview';
import Side from './Side';

const Board = () => {
    const {addPost} = useContext(AddPostContext);
    const {board} = useParams();
    // TODO: obtain the first 10 posts and display them
    // retrieve id, title, description and date_created
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        getPosts(board)
            .then(res => setPosts(res))
            .catch(err => console.log(err));
            
        return () => {
        };
    }, []);
    
    return (
        <div className="board-wrapper">
            <div className="board">
                {addPost 
                    ? 
                    <AddPost></AddPost>
                    :
                    <>
                        {posts.map(elem => <PostPreview key={elem.post_id} data={elem} />)}
                    </>
                }
            </div>
            <Side board={board}/>
        </div>
    );
};

export default Board;
