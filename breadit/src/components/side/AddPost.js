import React, { useContext, useState } from 'react';
import {useSelector, useDispatch} from "react-redux";

import { AddPostContext } from '../../context/AddPostProvider';
import { addPost } from '../../utils/serverCalls';
import { fetchPosts } from '../../store/redux';
import Head from '../common/Head';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

// import {Editor, EditorState} from 'draft-js';
// import 'draft-js/dist/Draft.css';



/**
 * Add Post
 * Form component that appears over the results listed in Board, 
 * with the details needed for a new post: title and description
 * The post is added to the currently selected board. 
 * @returns 
 * @todo add rce and handle photos and videos
 */

const AddPost = () => {
    const {showAddOverlay} = useContext(AddPostContext);
    const [title, setTitle] = useState("");
    const [contents, setContents] = useState("");
    const {board_id, name} = useSelector(state => state.board);
    const page = useSelector(state => state.page);
    const dispatch = useDispatch();

    // handle post creation 
    const createPost = (e) => {
        e.preventDefault();
        const date_created = new Date();
        addPost(board_id, title, date_created, contents)
            .then(res => {
                setContents("");
                setTitle("");
                closeAdd();
                dispatch(fetchPosts({board: board_id, page}));
            })
            .catch(err => console.log(err));
            
    };

    const closeAdd = () => showAddOverlay();

    return (
        <>
            <Head title={`Add new post on ${name}`}/>
            <div className="add-post">
                <h2>Add a new post</h2>
                <form onSubmit={createPost}>
                    <label>Title</label>
                    <input type="text" onChange={e => setTitle(e.target.value)} value={title} required/>
                    <label>Your post</label>
                    <ReactQuill theme="snow" value={contents} onChange={setContents} />
                    <div className="buttons">
                        <button onClick={closeAdd}>Go back</button>
                        <button type="submit">Add new post</button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default AddPost;
