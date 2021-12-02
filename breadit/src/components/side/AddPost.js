import React, { useContext, useState } from 'react';
import {useSelector, useDispatch} from "react-redux";

import { AddPostContext } from '../../context/AddPostProvider';
import { addPost } from '../../utils/serverCalls';
import { fetchPosts } from '../../store/redux';
import Head from '../common/Head';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";



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
        <div className="add-post-wrapper row">
            <Head title={`Add new post on ${name}`}/>
            <div className="add-post row mx-auto p-4 my-3">
                <h2>Add a new post</h2>
                <Form onSubmit={createPost}>
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" className="input-custom" onChange={e => setTitle(e.target.value)} value={title} required/>
                    <Form.Label className="mt-3">Your post</Form.Label>

                    <ReactQuill theme="snow" value={contents} onChange={setContents} />
                    <div className="buttons d-flex justify-content-end mt-3">
                        <Button onClick={closeAdd} className="btn-custom">Go back</Button>
                        <Button type="submit" className="btn-custom">Add new post</Button>
                    </div>
                </Form>
            </div>
        </div>
    );
};

export default AddPost;
