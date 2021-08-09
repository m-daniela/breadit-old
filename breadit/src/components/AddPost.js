import React, { useContext, useState } from 'react';
import { AddPostContext } from '../context/AddPostProvider';
import { addPost } from '../utils/serverCalls';

const AddPost = () => {
    const {showAddOverlay} = useContext(AddPostContext);
    const [title, setTitle] = useState("");
    const [contents, setContents] = useState("");
    const board = "b";

    const createPost = (e) => {
        e.preventDefault();
        const date_created = new Date();
        addPost(board, title, date_created, contents)
            .then(res => {
                console.log(res);
                setContents("");
                setTitle("");
                closeAdd();

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
