import React, { useContext } from 'react';
import { AddPostContext } from '../context/AddPostProvider';

const AddPost = () => {
    const {showAddOverlay} = useContext(AddPostContext);

    const closeAdd = () => showAddOverlay();
    return (
        <div className="add-post">
            <span>Add a new post</span>
            <form>
                <textarea></textarea>
                <div>
                    <button onClick={closeAdd}>Go back</button>
                    <button type="submit">Add new post</button>
                </div>
            </form>
            
            
            
        </div>
    );
};

export default AddPost;
