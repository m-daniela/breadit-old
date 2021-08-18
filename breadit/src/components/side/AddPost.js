import React, { useContext, useState } from 'react';
import {useSelector, useDispatch} from "react-redux";

import { AddPostContext } from '../../context/AddPostProvider';
import { addPost } from '../../utils/serverCalls';
import { fetchPosts } from '../../store/redux';

// Add Post
// form for creating a new post
// the user needs to add the title and the body of the post
// the board on which it should appear is derived from the 
// currently selected board
const AddPost = () => {
    const {showAddOverlay} = useContext(AddPostContext);
    const [title, setTitle] = useState("");
    const [contents, setContents] = useState("");
    const {board_id} = useSelector(state => state.board);
    const dispatch = useDispatch();

    // handle post creation 
    const createPost = (e) => {
        e.preventDefault();
        const date_created = new Date();
        console.log();
        addPost(board_id, title, date_created, contents)
            .then(res => {
                console.log(res);
                setContents("");
                setTitle("");
                closeAdd();
                dispatch(fetchPosts(board_id));
            })
            .catch(err => console.log(err));
            
    };

    const closeAdd = () => showAddOverlay();
    return (
        <div className="add-post">
            <span>Add a new post</span>
            <form onSubmit={createPost}>
                <label>Title</label>
                <input type="text" onChange={e => setTitle(e.target.value)} value={title} required/>
                <label>Your post</label>
                <textarea onChange={e => setContents(e.target.value)} value={contents} required />
                <div>
                    <button onClick={closeAdd}>Go back</button>
                    <button type="submit">Add new post</button>
                </div>
            </form>
        </div>
    );
};

export default AddPost;
